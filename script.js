// Emoji rain animation
const canvas = document.getElementById('emoji-rain-canvas');
const ctx = canvas.getContext('2d');

// 46 different emojis
const EMOJIS_SET = [
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💖", "💗", "💓", "💕", "💞", "💘",
    "✨", "🌟", "⭐", "🌙", "☀️", "🌸", "🌺", "🌻", "🌹", "🥀", "🍁", "🍂", "💫", "⚡", "🔥",
    "🎉", "🎈", "💝", "🎀", "🪄", "💌", "💋", "👑", "💎", "🍀", "🌼", "🌷", "🌿", "⭐️", "🌈", "🍒"
];

// Emoji particle class
class EmojiParticle {
    constructor(x, y, emojiChar, size, speed, opacity) {
        this.x = x;
        this.y = y;
        this.emoji = emojiChar;
        this.size = size;
        this.speed = speed;
        this.opacity = opacity;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleAmplitude = 0.6 + Math.random() * 1.2;
    }
    
    update(canvasWidth, canvasHeight) {
        this.y += this.speed;
        this.x += Math.sin(this.wobble) * 0.4;
        this.wobble += this.wobbleSpeed;
        
        if (this.y > canvasHeight + this.size) {
            this.y = -this.size - Math.random() * 80;
            this.x = Math.random() * canvasWidth;
            this.emoji = EMOJIS_SET[Math.floor(Math.random() * EMOJIS_SET.length)];
            this.speed = 1.2 + Math.random() * 3.2;
            this.size = 20 + Math.random() * 26;
            this.opacity = 0.5 + Math.random() * 0.5;
        }
        
        if (this.x < -20) this.x = -20;
        if (this.x > canvasWidth + 20) this.x = canvasWidth + 20;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Android Emoji", "EmojiOne Color", sans-serif`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.emoji, this.x, this.y);
        ctx.restore();
    }
}

let particles = [];
let animationId = null;
let canvasWidth, canvasHeight;

function initRain() {
    const PARTICLE_COUNT = 160;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const randomEmoji = EMOJIS_SET[Math.floor(Math.random() * EMOJIS_SET.length)];
        const size = 20 + Math.random() * 28;
        const speed = 0.9 + Math.random() * 3.0;
        const opacity = 0.5 + Math.random() * 0.5;
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight * 1.2 - canvasHeight * 0.2;
        particles.push(new EmojiParticle(x, y, randomEmoji, size, speed, opacity));
    }
}

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    if (particles.length > 0) {
        for (let p of particles) {
            p.x = Math.min(canvasWidth - 20, Math.max(0, p.x));
            p.y = p.y % (canvasHeight + 100);
            if (p.y > canvasHeight) p.y = canvasHeight - 50;
        }
    }
}

function drawRain() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let p of particles) {
        p.update(canvasWidth, canvasHeight);
        p.draw(ctx);
    }
    animationId = requestAnimationFrame(drawRain);
}

function startEmojiRain() {
    resizeCanvas();
    initRain();
    drawRain();
}

// Create click sparkle effect
function createClickSparkle(e) {
    const burstCount = 16;
    const container = document.body;
    
    for (let i = 0; i < burstCount; i++) {
        const span = document.createElement('div');
        const randomEmoji = EMOJIS_SET[Math.floor(Math.random() * EMOJIS_SET.length)];
        span.innerText = randomEmoji;
        span.style.position = 'fixed';
        span.style.left = (e.clientX - 15 + (Math.random() * 30)) + 'px';
        span.style.top = (e.clientY - 15 + (Math.random() * 30)) + 'px';
        span.style.fontSize = (18 + Math.random() * 24) + 'px';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '999';
        span.style.opacity = '1';
        span.style.transition = 'all 1.2s ease-out';
        span.style.filter = 'drop-shadow(0 0 4px gold)';
        container.appendChild(span);
        
        const dx = (Math.random() - 0.5) * 100;
        const dy = (Math.random() - 0.8) * 70 - 20;
        
        setTimeout(() => {
            span.style.transform = `translate(${dx}px, ${dy}px) scale(1.3)`;
            span.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            span.remove();
        }, 1200);
    }
    
    const card = document.querySelector('.tribute-card');
    card.style.transform = 'scale(1.02)';
    setTimeout(() => { card.style.transform = ''; }, 200);
}

// Subtle color shift animation
let hueShift = 0;
function subtleColorShift() {
    const sentenceEl = document.getElementById('amharicSentence');
    if (!sentenceEl) return;
    
    const angle = (hueShift % 360);
    const newGrad = `linear-gradient(${angle}deg, #FFE6C7, #FFD0A4, #FFB77C)`;
    sentenceEl.style.background = newGrad;
    sentenceEl.style.backgroundClip = 'text';
    sentenceEl.style.webkitBackgroundClip = 'text';
    hueShift = (hueShift + 0.6) % 360;
    setTimeout(subtleColorShift, 180);
}

// Occasional floating emoji
function occasionalGlowEmoji() {
    const extraEmoji = document.createElement('div');
    const randEm = EMOJIS_SET[Math.floor(Math.random() * EMOJIS_SET.length)];
    extraEmoji.innerText = randEm;
    extraEmoji.style.position = 'fixed';
    extraEmoji.style.left = Math.random() * window.innerWidth + 'px';
    extraEmoji.style.top = '-40px';
    extraEmoji.style.fontSize = (35 + Math.random() * 45) + 'px';
    extraEmoji.style.opacity = '0.7';
    extraEmoji.style.pointerEvents = 'none';
    extraEmoji.style.zIndex = '12';
    extraEmoji.style.transition = 'transform 2s linear, opacity 2s ease';
    extraEmoji.style.filter = 'drop-shadow(0 0 8px gold)';
    document.body.appendChild(extraEmoji);
    
    let posY = -40;
    const interval = setInterval(() => {
        posY += 1.2;
        extraEmoji.style.top = posY + 'px';
        if (posY > window.innerHeight + 100) {
            clearInterval(interval);
            if(extraEmoji && extraEmoji.remove) extraEmoji.remove();
        }
    }, 30);
    
    setTimeout(() => {
        if(extraEmoji && extraEmoji.remove) {
            clearInterval(interval);
            extraEmoji.remove();
        }
    }, 7000);
}

// Event listeners and initialization
window.addEventListener('resize', () => {
    resizeCanvas();
    for (let p of particles) {
        if (p.x > canvasWidth) p.x = canvasWidth - 20;
        if (p.y > canvasHeight + 50) p.y = canvasHeight * 0.2;
    }
});

// Click event on sentence
const sentenceEl = document.getElementById('amharicSentence');
sentenceEl.addEventListener('click', createClickSparkle);

// Hover effect on image
const heroImg = document.querySelector('.hero-image-frame img');
if (heroImg) {
    heroImg.addEventListener('mouseenter', () => {
        const card = document.querySelector('.tribute-card');
        card.style.boxShadow = '0 0 0 3px #ffbb77 inset, 0 30px 50px black';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 400);
    });
}

// Start everything
startEmojiRain();
subtleColorShift();

// Spawn occasional emojis
setInterval(() => {
    if (Math.random() > 0.6) {
        occasionalGlowEmoji();
    }
}, 3500);

// Initial load animation
window.addEventListener('load', () => {
    resizeCanvas();
    if (particles.length === 0) {
        initRain();
    } else {
        for(let p of particles) {
            if(p.y > canvasHeight) p.y = Math.random() * canvasHeight;
        }
    }
    
    // Welcome burst effect
    setTimeout(() => {
        const cardRect = document.querySelector('.tribute-card').getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width/2;
        const centerY = cardRect.top + cardRect.height/2;
        
        for(let i = 0; i < 12; i++) {
            const em = document.createElement('div');
            em.innerText = EMOJIS_SET[Math.floor(Math.random() * EMOJIS_SET.length)];
            em.style.position = 'fixed';
            em.style.left = (centerX - 10 + Math.random()*20)+'px';
            em.style.top = (centerY - 10 + Math.random()*20)+'px';
            em.style.fontSize = '22px';
            em.style.transition = 'all 1s';
            em.style.opacity = '1';
            em.style.pointerEvents = 'none';
            em.style.zIndex = '999';
            document.body.appendChild(em);
            
            setTimeout(() => {
                em.style.transform = `translate(${(Math.random()-0.5)*80}px, ${(Math.random()-0.7)*70 - 30}px)`;
                em.style.opacity = '0';
            }, 10);
            
            setTimeout(() => em.remove(), 1000);
        }
    }, 400);
});

// Orientation change handler
window.addEventListener('orientationchange', () => {
    setTimeout(() => { resizeCanvas(); }, 50);
});