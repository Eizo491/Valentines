const message = "Hey beautiful... I have a question for you.";
const typingSpeed = 100;
let charIndex = 0;
let yesScale = 1;
let noScale = 1;

// --- FEATURE 1: EXPANDED NO BUTTON TEXTS ---
const noTexts = [
    "Are you sure? 🥺",
    "Pikir lagi sayang... 💭",
    "Wrong button! 😜",
    "Hehe try again! 🏃💨",
    "You can't catch me! 🐾",
    "Give it another thought? 🤔",
    "Error: 'No' not found ❌",
    "Is that your final answer? 🎤",
    "I'll wait... ⏳",
    "My heart is breaking! 💔",
    "You're misclicking, right? 🖱️",
    "Try the green one! 👈",
    "Don't be mean! 😢",
    "Click 'Yes' for a surprise! ✨"
];
let noTextIndex = 0;

// --- FEATURE 2: EXPANDED LOVE REASONS ---
const loveReasons = [
    "Your beautiful smile ✨",
    "How kind you are ❤️",
    "The way you laugh 😂",
    "You're my favorite person 🌎",
    "Your warm hugs 🤗",
    "Everything about you! 💖",
    "The way you care for me 🥺",
    "You make me the luckiest person 🍀",
    "Your cute sleepy face 😴",
    "How smart you are 🧠",
    "Your amazing style 👗",
    "The way you say my name 📞",
    "Our bonding!!",
    "Because you're YOU! 🦄"
];

window.onload = function() {
    // Hide Loader
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        loader.classList.add('loader-hidden');
    }
    
    typeWriter();

    // Setup the Reason bubble trigger
    const catImg = document.getElementById('catGif');
    if (catImg) {
        catImg.style.cursor = "pointer";
        catImg.onclick = showReason;
    }
};

// --- TYPEWRITER EFFECT ---
function typeWriter() {
    const textContainer = document.getElementById("textContainer");
    if (charIndex < message.length) {
        textContainer.innerHTML += message.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(revealEnvelope, 1000);
    }
}

function revealEnvelope() {
    document.getElementById("messageOverlay").style.display = "none";
    const envelope = document.getElementById("envelopeContainer");
    envelope.classList.remove("hidden-fade");
    envelope.classList.add("show-fade");
}

// --- OPEN LETTER & IPHONE GIF FIX ---
function openLetter() {
    const bgm = document.getElementById('romanticBgm');
    if (bgm) {
        bgm.volume = 0.3;
        bgm.play();
    }

    const catGif = document.getElementById('catGif');
    if (catGif) {
        const currentSrc = catGif.src;
        catGif.src = ""; 
        catGif.src = currentSrc + "?t=" + new Date().getTime(); 
    }

    document.getElementById('envelopeContainer').classList.add('hidden');
    document.getElementById('letterContainer').classList.remove('hidden');
}

// --- FLOATING HEARTS ON CLICK ---
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'floating-heart';
    heart.style.left = (e.clientX - 12) + 'px';
    heart.style.top = (e.clientY - 12) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 1000);
});

// --- TELEPORTING NO BUTTON & DYNAMIC TEXT ---
function handleNo() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const windowBox = document.querySelector('.window-box');
    const squeak = document.getElementById('squeakSound');

    if (squeak) {
        squeak.currentTime = 0; 
        squeak.play();
    }

    // Shake
    windowBox.classList.remove('shake'); 
    void windowBox.offsetWidth; 
    windowBox.classList.add('shake');

    // Change Text
    noBtn.innerHTML = noTexts[noTextIndex];
    noTextIndex = (noTextIndex + 1) % noTexts.length;

    // Grow Yes Button
    yesScale += 0.4;
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.zIndex = "100";

    // Teleport
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed'; 
    noBtn.style.left = Math.max(padding, randomX) + 'px';
    noBtn.style.top = Math.max(padding, randomY) + 'px';
}

// --- REASONS POP-UP ---
function showReason() {
    const oldBubble = document.querySelector('.speech-bubble');
    if (oldBubble) oldBubble.remove();

    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    const randomReason = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    bubble.innerHTML = randomReason;

    document.querySelector('.image-placeholder').appendChild(bubble);

    setTimeout(() => { if (bubble) bubble.remove(); }, 2500);
}

// --- CELEBRATION ---
function celebrate() {
    const bgm = document.getElementById('romanticBgm');
    const windowBox = document.querySelector('.window-box');

    if (bgm) bgm.pause();
    if (windowBox) windowBox.style.animation = 'none';

    const audio = document.getElementById('celebrationSound');
    if (audio) audio.play();

    const happyCat = document.getElementById('happyCat');
    if (happyCat) {
        const hSrc = happyCat.src;
        happyCat.src = "";
        happyCat.src = hSrc + "?t=" + new Date().getTime();
    }

    document.getElementById('questionWindow').classList.add('hidden');
    document.getElementById('successSection').classList.remove('hidden');

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({ 
            particleCount: 25,
            startVelocity: 30,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#ff4d6d', '#ffcad4', '#ffffff'] 
        });
    }, 250);

    setTimeout(() => {
        document.getElementById('specialMessage').classList.add('show');
    }, 1000);
}