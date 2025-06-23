const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return "Bonjour";
    } else if (hour >= 12 && hour < 18) {
        return "Bon après-midi";
    } else if (hour >= 18 && hour < 22) {
        return "Bonsoir";
    } else {
        return "Bonne nuit";
    }
}

function getFarewell() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return "Bonne journée";
    } else if (hour >= 12 && hour < 18) {
        return "Bon après-midi";
    } else if (hour >= 18 && hour < 22) {
        return "Bonne soirée";
    } else {
        return "Bonne nuit";
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
    
    if (['sortir', 'quitter', 'exit', 'bye', 'au revoir'].includes(lowerText)) {
        rl.close();
        return;
    } else if (isPalindrome(userText)) {
        console.log('Bien dit !');
    }

    console.log(`${userText}`);
    askForInput();
}

function askForInput() {
    rl.question('\n> ', processInput);
}

const startGreeting = getGreeting();
console.log(`${startGreeting} ! Bienvenue dans l'application console.`);

rl.on('close', () => {
    const endFarewell = getFarewell();
    console.log(`\n${endFarewell} et à bientôt ! 👋`);
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n\nFermeture de l\'application...');
    rl.close();
});

askForInput();