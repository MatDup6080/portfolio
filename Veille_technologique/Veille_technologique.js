// ===== THÈME =====
const themeToggle = document.getElementById('themeToggle');

// Appliquer le thème sauvegardé immédiatement (évite le flash)
(function () {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('dark-theme');
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        const isLight = document.body.classList.contains('dark-theme');
        icon.classList.toggle('fa-moon', !isLight);
        icon.classList.toggle('fa-sun', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Synchroniser l'icône au chargement
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('dark-theme')) {
            const icon = themeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}


// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const menuClose  = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
if (menuClose)  menuClose.addEventListener('click', closeMobileMenu);

// Fermer en cliquant sur un lien du menu mobile
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fermer en cliquant en dehors du menu
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active') &&
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
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            window.scrollTo({ top: targetEl.offsetTop - 80, behavior: 'smooth' });
        }
    });
});


// ===== FLÈCHES DE NAVIGATION DU MENU =====
const navMenu    = document.getElementById('navMenu');
const arrowLeft  = document.getElementById('navArrowLeft');
const arrowRight = document.getElementById('navArrowRight');
const scrollStep = 180;

function updateArrows() {
    if (!navMenu || !arrowLeft || !arrowRight) return;
    const atStart = navMenu.scrollLeft <= 4;
    const atEnd   = navMenu.scrollLeft + navMenu.clientWidth >= navMenu.scrollWidth - 4;
    arrowLeft.style.opacity  = atStart ? '0.25' : '1';
    arrowRight.style.opacity = atEnd   ? '0.25' : '1';
}

if (navMenu) {
    arrowLeft.addEventListener('click',  () => navMenu.scrollBy({ left: -scrollStep, behavior: 'smooth' }));
    arrowRight.addEventListener('click', () => navMenu.scrollBy({ left:  scrollStep, behavior: 'smooth' }));
    navMenu.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();
}


// ===== HIGHLIGHT DU MENU AU DÉFILEMENT =====
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveLinks() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.getAttribute('id');
        }
    });

    [...navLinks, ...mobileLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        // On compare l'ancre (sans le #) à la section courante
        if (href && href.startsWith('#') && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLinks, { passive: true });


// ===== ANIMATIONS AU DÉFILEMENT =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

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


// ===== ANNÉE DYNAMIQUE DANS LE FOOTER =====
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ===== CHARGEMENT =====
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});
