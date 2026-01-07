/* =========================
   🎵 MUSIC CONTROL + GLOW
========================= */
function toggleMusic() {
    const audio = document.getElementById("birthdaySong");
    const btn = document.getElementById("musicBtn");
    const hero = document.querySelector(".hero");

    if (audio.paused) {
        audio.play();
        btn.textContent = "⏸ Pause Music";
        hero.classList.add("music-glow");
    } else {
        audio.pause();
        btn.textContent = "🎵 Play Music";
        hero.classList.remove("music-glow");
    }
}

/* =========================
   🎁 SURPRISE POPUP
========================= */
setTimeout(() => {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <div>
            💖 Surprise! 💖<br><br>
            You are not just my sister,<br>
            you are my best friend 🌸<br><br>
            <button onclick="this.closest('.popup').remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
}, 4000);

/* =========================
   🇮🇳 IST COUNTDOWN (JAN 8)
========================= */
const birthdayIST = new Date(Date.UTC(2026, 0, 8, 0, 0, 0));

function getISTTime() {
    return new Date(Date.now() + (5.5 * 60 * 60 * 1000));
}

setInterval(() => {
    const diff = birthdayIST.getTime() - getISTTime().getTime();
    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        countdown.innerText = `🎉 ${days} days to go!`;
    } else {
        countdown.innerText = "🎂 TODAY IS YOUR BIRTHDAY 🎉💖";
        countdown.style.fontWeight = "bold";
    }
}, 1000);

/* =========================
   💖 FLOATING HEARTS
========================= */
setInterval(() => {
    const heart = document.createElement("div");
    heart.innerText = "💖";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = "24px";
    heart.style.animation = "floatUp 4s linear";
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}, 900);

/* =========================
   🖼 SLIDESHOW (config.json)
========================= */
let images = [];
let current = 0;
const slideImg = document.getElementById("slideImage");

fetch("config.json")
    .then(res => res.json())
    .then(config => {
        images = config.photos || [];

        if (images.length > 0 && slideImg) {
            slideImg.src = images[0];

            setInterval(() => {
                current = (current + 1) % images.length;
                slideImg.src = images[current];
            }, 3000);
        } else if (slideImg) {
            slideImg.style.display = "none";
        }
    })
    .catch(() => {
        if (slideImg) slideImg.style.display = "none";
    });

/* =========================
   🕯 CANDLE BLOW ANIMATION
========================= */
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const candleText = document.querySelector(".candle-text");

if (candle && flame) {
    candle.addEventListener("click", () => {
        flame.classList.add("blow-out");

        setTimeout(() => {
            flame.style.display = "none";
            if (candleText) {
                candleText.innerText = "✨ Make a wish! Happy Birthday ✨";
            }
        }, 600);
    });
}

/* =========================
   🎊 CONFETTI BACKGROUND
========================= */
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 15 + 5,
    d: Math.random() * 120,
    color: `hsl(${Math.random() * 360},100%,50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05
}));

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt, p.y);
        ctx.lineTo(p.x + p.tilt + p.r, p.y + p.r);
        ctx.stroke();

        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3) / 2;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawConfetti);
}

drawConfetti();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
