// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        // Create a mailto link
        const mailtoLink = `mailto:eliott.vanovermeir@gmail.com?subject=Message de ${name}&body=${encodeURIComponent(message)}%0A%0ADe: ${name}%0AEmail: ${email}`;
        
        alert('Merci! Redirection vers votre client email...');
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--light-text)';
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const energyOrb = document.querySelector('.energy-orb');
    if (energyOrb) {
        energyOrb.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.2}px))`;
    }
});

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

window.addEventListener('scroll', () => {
    if (!countersAnimated && statNumbers.length > 0) {
        const firstStat = statNumbers[0];
        const rect = firstStat.getBoundingClientRect();
        
        if (rect.top < window.innerHeight) {
            statNumbers.forEach(number => {
                const target = parseInt(number.textContent);
                animateCounter(number, target);
            });
            countersAnimated = true;
        }
    }
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('Portfolio loaded successfully! 🚀');
    console.log('Contact: eliott.vanovermeir@gmail.com');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'c') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.altKey && e.key === 'p') {
        document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    }
    if (e.altKey && e.key === 'a') {
        document.getElementById('apropos').scrollIntoView({ behavior: 'smooth' });
    }
});

console.log('%c🚀 Raccourcis clavier disponibles:', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
console.log('%cAlt + A : À propos', 'color: #00d4ff;');
console.log('%cAlt + P : Projets', 'color: #00d4ff;');
console.log('%cAlt + C : Contact', 'color: #00d4ff;');