// 1. TYPEWRITER EFFECT
const roles = ["Secure Systems", "Deep Learning Models", "Efficient Algorithms", "Cloud Architectures"];
let roleIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const eraseSpeed = 50;
const delayBetween = 2000;
const typeSpan = document.querySelector(".typewriter");

function type() {
    if (charIndex < roles[roleIndex].length) {
        if(typeSpan) typeSpan.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typeSpeed);
    } else {
        setTimeout(erase, delayBetween);
    }
}

function erase() {
    if (charIndex > 0) {
        if(typeSpan) typeSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, eraseSpeed);
    } else {
        roleIndex++;
        if (roleIndex >= roles.length) roleIndex = 0;
        setTimeout(type, typeSpeed + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(roles.length) setTimeout(type, delayBetween);
});


// 2. NEURAL NETWORK ANIMATION
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = '#00ff9d';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0, 255, 157, ' + (1 - distance/100) * 0.2 + ')';
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// 3. STATS COUNTER
const counters = document.querySelectorAll('.num');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-val');
        const count = +counter.innerText.replace('+', '');
        const inc = target / 200;
        if(count < target) {
            counter.innerText = Math.ceil(count + inc) + "+";
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target + "+";
        }
    }
    updateCount();
});