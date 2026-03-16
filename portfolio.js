// ===== THÈME =====
const themeToggle = document.getElementById('themeToggle');

// Appliquer le thème sauvegardé dès le chargement (avant DOMContentLoaded pour éviter le flash)
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('dark-theme');
    }
})();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    const isLight = document.body.classList.contains('dark-theme');

    icon.classList.toggle('fa-moon', !isLight);
    icon.classList.toggle('fa-sun', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Synchroniser l'icône avec le thème au chargement
document.addEventListener('DOMContentLoaded', () => {
    const isLight = document.body.classList.contains('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (isLight) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});


// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMobileMenu);
menuClose.addEventListener('click', closeMobileMenu);

// Fermer en cliquant sur un lien du menu mobile
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fermer en cliquant en dehors du menu
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        e.target !== menuToggle) {
        closeMobileMenu();
    }
});


// ===== DÉFILEMENT FLUIDE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// ===== EFFET DE FRAPPE =====
const typingText = document.getElementById('typingText');
const texts = [
    'Passionné par le code et l\'intelligence artificielle',
    'Créateur de solutions web en PHP, JavaScript et CSS',
    'Étudiant BTS SIO · Spécialité SLAM'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return; // Sécurité si l'élément n'existe pas

    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Démarrer l'effet de frappe après un court délai
setTimeout(typeEffect, 600);


// ===== HIGHLIGHT DU MENU AU DÉFILEMENT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveLinks() {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.getAttribute('id');
        }
    });

    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLinks, { passive: true });


// ===== ANIMATIONS AU DÉFILEMENT (IntersectionObserver) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.access-card, .tech-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});


// ===== FORMULAIRE DE CONTACT =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;

        // Feedback visuel
        btn.innerHTML = '<i class="fas fa-check"></i><span>Message envoyé !</span>';
        btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        btn.disabled = true;

        // Réinitialiser après 3 secondes
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}


// ===== ANNÉE DYNAMIQUE DANS LE FOOTER =====
const yearEl = document.getElementById('currentYear');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


// ===== CHARGEMENT =====
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});
