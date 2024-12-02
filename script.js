const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const splashScreen = document.querySelector('.splash-screen');
const closedScreen = document.querySelector('.closed-screen');
const letterScreen = document.querySelector('.letter-screen');
const giftSelection = document.querySelector('.gift-selection');
const tabButtons = document.querySelectorAll('.tab-button');
const giftOptions = document.querySelectorAll('.gift-options');

const exchangeGiftSelection = document.querySelector('.exchange-gift-selection');
const exchangeGiftOptions = document.querySelectorAll('.exchange-gift-options');
const exchangeTabButtons = document.querySelectorAll('.exchange-tab-button');

const textLines = [
    "I created this to celebrate Christmas with you virtually.",
    "Let’s have some fun with the items I’ve provided.",
    "Don’t be shy pick the items you like!",
    "Since this is an exchange of gifts", 
    "you can also select the items you’d like to give to me at the end."
];

const typingTextElement = document.getElementById('typing-text');
let lineIndex = 0;
let charIndex = 0;

function typeText() {
    if (lineIndex < textLines.length) {
        const currentLine = textLines[lineIndex];
        if (charIndex < currentLine.length) {
            typingTextElement.innerHTML += currentLine.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 80); // Adjust typing speed here
        } else {
            // Move to the next line
            typingTextElement.innerHTML += "<br>";
            charIndex = 0;
            lineIndex++;
            setTimeout(typeText, 500); // Pause between lines
        }
    } else {
        // Show the button after typing completes
        nextButton.classList.remove('hidden');
    }
}

// Start typing effect on page load
window.onload = typeText;


let selectedGift = null;
let selectedExchangeGift = null;


startButton.addEventListener('click', () => {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
        splashScreen.style.display = 'none';
        letterScreen.style.display = 'flex';
        letterScreen.style.opacity = '1';
    }, 500);
});

nextButton.addEventListener('click', () => {
    letterScreen.style.opacity = '0';
    setTimeout(() => {
        letterScreen.style.display = 'none';
        giftSelection.style.display = 'flex';
        giftSelection.style.opacity = '1';
    }, 500);
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        giftOptions.forEach(option => {
            option.style.display = option.id === category ? 'flex' : 'none';
        });
    });
});

giftSelection.addEventListener('click', (e) => {
    if (e.target.closest('.gift-option')) {
        selectedGift = e.target.closest('.gift-option').querySelector('p').innerText; // Capture gift name
        // alert(selectedGift);
        giftSelection.style.opacity = '0';
        setTimeout(() => {
            giftSelection.style.display = 'none';
            exchangeGiftSelection.style.display = 'flex';
            exchangeGiftSelection.style.opacity = '1';
        }, 500);
    }
});

exchangeTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        exchangeTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        exchangeGiftOptions.forEach(option => {
            option.style.display = option.id === category ? 'flex' : 'none';
        });
    });
});

exchangeGiftSelection.addEventListener('click', (e) => {
    if (e.target.closest('.gift-option')) {
        selectedExchangeGift = e.target.closest('.gift-option').querySelector('p').innerText; // Capture gift name
        // alert(selectedExchangeGift);
        exchangeGiftSelection.style.opacity = '0';
        setTimeout(() => {
            exchangeGiftSelection.style.display = 'none';
            closedScreen.style.display = 'flex';
            closedScreen.style.opacity = '1';
        }, 500);
         sendEmail(); // Trigger email sending
    }
});

function sendEmail() {
    const templateParams = {
        to_email: "karvinnd1207@gmail.com",
        selected_gift: selectedGift,
        selected_exchange_gift: selectedExchangeGift,
    };

    emailjs.send('service_hkhmw6r', 'template_k5pgtxi', templateParams)
        .then(response => {
            console.log('Email sent successfully:', response.status, response.text);
        })
        .catch(err => {
            console.error('Failed to send email:', err);
        });
}