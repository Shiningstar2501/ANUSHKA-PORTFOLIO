// ── Hamburger menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Theme toggle ────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check saved preference
const saved = localStorage.getItem('theme');
if (saved) {
  root.setAttribute('data-theme', saved);
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const isDark = current === 'dark' ||
    (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Scroll reveal ───────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Typing effect ───────────────────────────────────────────
const roles = [
  'Cloud & DevOps Engineer',
  'AI Engineer',
  'Kubernetes Specialist',
  'Security Compliance Engineer',
  'Automation Builder'
];

const typedEl = document.getElementById('heroTyped');
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
let pauseMs = 0;

function typeLoop() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      pauseMs = 1800;
    } else {
      pauseMs = 60 + Math.random() * 40;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      pauseMs = 400;
    } else {
      pauseMs = 30;
    }
  }

  setTimeout(typeLoop, pauseMs);
}

typeLoop();

// ── Nav shrink on scroll ────────────────────────────────────
const navWrap = document.querySelector('.nav-wrap');
window.addEventListener('scroll', () => {
  navWrap.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,0.15)'
    : 'none';
}, { passive: true });
