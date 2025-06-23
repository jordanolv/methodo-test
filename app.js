const readline = require('readline');

let language = 'fr'; // Default language

const translations = {
    fr: {
        greeting: {
            morning: "Bonjour",
            afternoon: "Bon après-midi",
            evening: "Bonsoir",
            night: "Bonne nuit"
        },
        farewell: {
            morning: "Bonne journée",
            afternoon: "Bon après-midi",
            evening: "Bonne soirée",
            night: "Bonne nuit"
        },
        welcome: "Bienvenue dans l'application console.",
        goodbye: "et à bientôt ! 👋",
        palindrome: "Bien dit !",
        exitCommands: ['sortir', 'quitter', 'exit', 'bye', 'au revoir'],
        prompt: "> ",
        closing: "Fermeture de l'application...",
        languagePrompt: "Choisissez votre langue/Choose your language (fr/en): "
    },
    en: {
        greeting: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening",
            night: "Good night"
        },
        farewell: {
            morning: "Have a nice day",
            afternoon: "Have a good afternoon",
            evening: "Have a good evening",
            night: "Good night"
        },
        welcome: "Welcome to the console application.",
        goodbye: "see you soon! 👋",
        palindrome: "Well said!",
        exitCommands: ['exit', 'quit', 'bye', 'goodbye'],
        prompt: "> ",
        closing: "Closing the application...",
        languagePrompt: "Choisissez votre langue/Choose your language (fr/en): "
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return translations[language].greeting.morning;
    } else if (hour >= 12 && hour < 18) {
        return translations[language].greeting.afternoon;
    } else if (hour >= 18 && hour < 22) {
        return translations[language].greeting.evening;
    } else {
        return translations[language].greeting.night;
    }
}

function getFarewell() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return translations[language].farewell.morning;
    } else if (hour >= 12 && hour < 18) {
        return translations[language].farewell.afternoon;
    } else if (hour >= 18 && hour < 22) {
        return translations[language].farewell.evening;
    } else {
        return translations[language].farewell.night;
    }
}

function isPalindrome(text) {
    const cleaned = text.toLowerCase().replace(/[^a-zàâäéèêëïîôöùûüÿç]/g, '');
    if (cleaned.length < 2) return false;
    return cleaned === cleaned.split('').reverse().join('');
}

function processInput(input) {
    const userText = input.trim();
    
    if (!userText) {
        askForInput();
        return;
    }
    
    const lowerText = userText.toLowerCase();
    
    if (translations[language].exitCommands.includes(lowerText)) {
        rl.close();
        return;
    } else if (isPalindrome(userText)) {
        console.log(translations[language].palindrome);
    }

    console.log(`${userText}`);
    askForInput();
}

function askForInput() {
    rl.question(`\n${translations[language].prompt}`, processInput);
}

function startApp() {
    const startGreeting = getGreeting();
    console.log(`${startGreeting} ! ${translations[language].welcome}`);
    
    rl.on('close', () => {
        const endFarewell = getFarewell();
        console.log(`\n${endFarewell} ${translations[language].goodbye}`);
        process.exit(0);
    });
    
    process.on('SIGINT', () => {
        console.log(`\n\n${translations[language].closing}`);
        rl.close();
    });
    
    askForInput();
}

function askForLanguage() {
    rl.question(translations.fr.languagePrompt, (input) => {
        const choice = input.trim().toLowerCase();
        if (choice === 'en') {
            language = 'en';
        } else {
            language = 'fr'; 
        }
        startApp();
    });
}

askForLanguage();