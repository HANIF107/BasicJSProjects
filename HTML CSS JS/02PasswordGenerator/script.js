let inputSlider = document.getElementById('inputSlider');
let sliderValue = document.getElementById('sliderValue');
let passwordBox = document.getElementById('passwordBox');
let lowerCase = document.getElementById('lowerCase');
let upperCase = document.getElementById('upperCase');
let numbers = document.getElementById('numbers');
let symbols = document.getElementById('symbols');
let genBtn = document.getElementById('genBtn');
let copyIcon = document.getElementById('copyIcon');

// Character sets
const charSets = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '`~!@#$%^&*_-+='
};

// Update slider display
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

// Generate password
genBtn.addEventListener('click', () => {
    passwordBox.value = generatePassword();
});

function generatePassword() {
    let selectedChars = '';
    let password = '';
    

    if (lowerCase.checked) selectedChars += charSets.lower;
    if (upperCase.checked) selectedChars += charSets.upper;
    if (numbers.checked) selectedChars += charSets.numbers;
    if (symbols.checked) selectedChars += charSets.symbols;
    

    if (selectedChars) {
        for (let i = 0; i < inputSlider.value; i++) {
            password += selectedChars.charAt(Math.floor(Math.random() * selectedChars.length));
        }
    }
    
    return password;
}
 
copyIcon.addEventListener('click', async () => {
    if (!passwordBox.value) {
        alert("No password to copy!");
        return;
    }

    try {
    
        await navigator.clipboard.writeText(passwordBox.value);
        
        const icon = copyIcon.querySelector('i');
        icon.classList.replace('fa-copy', 'fa-check');
        copyIcon.title = "Copied!";
        
        setTimeout(() => {
            icon.classList.replace('fa-check', 'fa-copy');
            copyIcon.title = "Copy to clipboard";
        }, 2000);
        
    } catch (err) {
        console.error("Copy failed:", err);
        passwordBox.select();
        document.execCommand('copy');
        copyIcon.title = "Copied (fallback method)";
    }
});