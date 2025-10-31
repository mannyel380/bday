// script.js

// Login Validation
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const color = document.getElementById('colorInput').value.trim().toLowerCase();
    const errorMsg = document.getElementById('errorMessage');
    
    if (name.toLowerCase() === 'lilymae dacillo' && color === 'purple') {
        errorMsg.textContent = '';
        showWelcome();
    } else {
        errorMsg.textContent = 'You are not Lily!';
    }
});

// Show Welcome with Typewriter Effect and Fireworks
function showWelcome() {
    showPage('welcomePage');
    const message = "Welcome Lilymae Dacillo 💜";
    const welcomeEl = document.getElementById('welcomeMessage');
    let i = 0;
    
    welcomeEl.textContent = '';
    
    const typewriter = setInterval(() => {
        if (i < message.length) {
            welcomeEl.textContent += message.charAt(i);
            i++;
        } else {
            clearInterval(typewriter);
            setTimeout(() => showPage('mainMenu'), 2000);
        }
    }, 100);
    
    startFireworks();
}

// Fireworks Animation
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.radius = Math.random() * 3 + 1;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }
    
    let particles = [];
    const colors = ['#ff0080', '#00ffff', '#ffff00', '#ff00ff', '#00ff00'];
    
    function createFirework(x, y) {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        
        if (Math.random() < 0.05) {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Letters
const letters = [
    {
        title: "To Lily 💜",
        text: "I know your heart feels heavy and your spirit weary, but please remember that this moment is not the end of your story. Rest if you must — you are not falling behind by pausing to breathe. The world can wait while you gather your strength again. You are still worthy, still loved, and still growing in ways unseen. Even on the quiet days when your light feels dim, it has not gone out — it’s only resting, waiting for the dawn that will come, just as surely as it always does. 🌤️"
    },
    {
        title: "To Lily 💜",
        text: "I’ve watched you move through your days with such quiet dignity and kindness that it’s become one of my favorite sights in the world. There’s a strength in your gentleness, a clarity in your compassion, and an elegance in how you simply are—no fanfare needed. I hope you know how deeply your presence matters, even when you believe you’re going unseen. You inspire far more than you realise."
    }
];

function openLetter(num) {
    const modal = document.getElementById('letterModal');
    const letter = letters[num - 1];
    document.getElementById('letterTitle').textContent = letter.title;
    document.getElementById('letterText').textContent = letter.text;
    modal.classList.add('active');
}

function closeLetter() {
    document.getElementById('letterModal').classList.remove('active');
}

// 360 Image Rotation
let isDragging = false;
let startX = 0;
let currentRotation = 0;

const flowerViewer = document.getElementById('flowerViewer');
const flowerImg = flowerViewer.querySelector('img');

flowerViewer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - startX;
        currentRotation += deltaX * 0.5;
        flowerImg.style.transform = `rotateY(${currentRotation}deg)`;
        startX = e.clientX;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch events for mobile
flowerViewer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

flowerViewer.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - startX;
        currentRotation += deltaX * 0.5;
        flowerImg.style.transform = `rotateY(${currentRotation}deg)`;
        startX = e.touches[0].clientX;
    }
});

flowerViewer.addEventListener('touchend', () => {
    isDragging = false;
});

// Show Surprise Page
function showSurprise() {
    showPage('surprisePage');
    setupCanvas();
}

// Canvas Flower Blooming Animation
let canvas, ctx;
let animationId;
let bloomProgress = 0;

function setupCanvas() {
    canvas = document.getElementById('flowerCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    drawFlower(0);
}

function bloomFlower() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    bloomProgress = 0;
    animateBloom();
}

function animateBloom() {
    if (bloomProgress < 1) {
        bloomProgress += 0.02;
        drawFlower(bloomProgress);
        animationId = requestAnimationFrame(animateBloom);
    }
}

function drawFlower(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Stem
    ctx.strokeStyle = '#228b22';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, canvas.height);
    ctx.lineTo(centerX, centerY + 100 * (1 - progress * 0.3));
    ctx.stroke();
    
    // Leaves
    if (progress > 0.3) {
        const leafProgress = (progress - 0.3) / 0.7;
        drawLeaf(centerX - 30, centerY + 80, -30 * leafProgress, leafProgress);
        drawLeaf(centerX + 30, centerY + 80, 30 * leafProgress, leafProgress);
    }
    
    // Petals
    const petalCount = 8;
    const petalSize = 60 * progress;
    const angleStep = (Math.PI * 2) / petalCount;
    
    for (let i = 0; i < petalCount; i++) {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * 40 * progress;
        const y = centerY + Math.sin(angle) * 40 * progress;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Petal
        ctx.beginPath();
        ctx.ellipse(0, 0, petalSize * 0.8, petalSize * 0.4, 0, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petalSize);
        gradient.addColorStop(0, '#ff69b4');
        gradient.addColorStop(1, '#ff1493');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = '#ff1493';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Center
    const centerSize = 25 * progress;
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerSize);
    centerGradient.addColorStop(0, '#ffff00');
    centerGradient.addColorStop(1, '#ffa500');
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Center details
    if (progress > 0.7) {
        ctx.fillStyle = '#ff8c00';
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const x = centerX + Math.cos(angle) * 15;
            const y = centerY + Math.sin(angle) * 15;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function drawLeaf(x, y, offset, progress) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(offset * 0.02);
    
    ctx.beginPath();
    ctx.ellipse(offset, 0, Math.abs(offset) * progress, 20 * progress, 0, 0, Math.PI * 2);
    
    const gradient = ctx.createLinearGradient(-Math.abs(offset), 0, Math.abs(offset), 0);
    gradient.addColorStop(0, '#90EE90');
    gradient.addColorStop(1, '#228b22');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.strokeStyle = '#1a6b1a';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.restore();
}

// Heart Puzzle Game
const puzzleSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentStep = 0;
const secretMessages = [
    "Keep",
    "Going",
    "Youre",
    "Doing",
    "An",
    "Amazing",
    "Job",
    "",
    "💜"
];

function initPuzzle() {
    const grid = document.getElementById('heartsGrid');
    grid.innerHTML = '';
    currentStep = 0;
    
    puzzleSequence.forEach((num, index) => {
        const button = document.createElement('button');
        button.className = 'heart-button';
        button.innerHTML = `<span class="number">${num}</span>❤️`;
        button.onclick = () => checkHeart(num, button, index);
        grid.appendChild(button);
    });
}

function checkHeart(num, button, index) {
    if (button.classList.contains('revealed')) return;
    
    if (num === puzzleSequence[currentStep]) {
        button.classList.add('revealed');
        currentStep++;
        
        // Update message progressively
        const messageEl = document.getElementById('secretMessage');
        const revealedWords = secretMessages.slice(0, currentStep);
        messageEl.textContent = revealedWords.join(' ');
        messageEl.classList.add('visible');
        
        if (currentStep === puzzleSequence.length) {
            setTimeout(() => {
                messageEl.textContent = '💜 Youre worth every bit of love and care you give to others.💜';
                celebratePuzzleComplete();
            }, 500);
        }
    } else {
        // Wrong heart clicked
        button.style.animation = 'shake 0.5s';
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
}

function celebratePuzzleComplete() {
    // Create falling hearts animation
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createFallingHeart(), i * 100);
    }
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💜';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.zIndex = '9999';
    heart.style.transition = 'all 3s ease-in';
    heart.style.pointerEvents = 'none';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.top = '100vh';
        heart.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        heart.remove();
    }, 3100);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('letterModal');
    if (event.target === modal) {
        closeLetter();
    }
}

// Initialize puzzle when page loads
document.addEventListener('DOMContentLoaded', function() {
    initPuzzle();
});