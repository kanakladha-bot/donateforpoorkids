/* ═══════════════════════════════════════════
   DonateForPoorKids — Main JavaScript
   ═══════════════════════════════════════════ */

'use strict';

/* ── Loader ── */
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
    document.body.classList.remove('loading');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 1200);
});

/* ── Particles ── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 8 : 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 4;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 10 + 8}s;
      animation-delay:${Math.random() * -15}s;
      opacity:${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
})();

/* ── Navbar ── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Animated counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN');
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

/* ── Progress bars ── */
const progObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      progObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.prog-fill').forEach(b => progObserver.observe(b));

/* ── Gallery ── */
const galleryData = [
  { color: '#0F4C81', icon: '📚', caption: 'Children receiving education kits', label: 'Education Drive' },
  { color: '#2E8B57', icon: '🍛', caption: 'Daily meal distribution in Govindpuri', label: 'Food Programme' },
  { color: '#8B4513', icon: '👕', caption: 'Seasonal clothing donation camp', label: 'Clothing Drive' },
  { color: '#6B2D8B', icon: '💊', caption: 'Free health check-up camp', label: 'Health Camp' },
  { color: '#1a6bb5', icon: '✏️', caption: 'Children at our study centre', label: 'Study Centre' },
  { color: '#236844', icon: '🎉', caption: 'Annual celebration with volunteers', label: 'Annual Fest' },
  { color: '#c0392b', icon: '❤️', caption: 'Volunteer orientation day', label: 'Volunteer Day' },
  { color: '#d4730a', icon: '🌟', caption: 'Award ceremony for top students', label: 'Achievers' },
];

const galleryGrid = document.getElementById('galleryGrid');
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxCap  = document.getElementById('lightboxCaption');
let   lbIndex      = 0;

function makeSVG(item, size = 200) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="${item.color}"/>
    <rect width="200" height="200" fill="url(#pg${size})" opacity="0.3"/>
    <defs>
      <linearGradient id="pg${size}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0.3)"/>
      </linearGradient>
    </defs>
    <text x="100" y="110" text-anchor="middle" font-size="64" font-family="Arial">${item.icon}</text>
    <text x="100" y="175" text-anchor="middle" font-size="13" fill="rgba(255,255,255,0.9)" font-family="Arial" font-weight="bold">${item.label}</text>
  </svg>`;
}

galleryData.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'gallery-item reveal';
  if (i % 3 === 0) div.style.gridColumn = 'span 1';
  div.innerHTML = `
    <div class="gallery-svg">${makeSVG(item)}</div>
    <div class="gallery-hover">
      <div class="gallery-hover-inner">
        <i class="fas fa-search-plus"></i>
        <p>${item.label}</p>
      </div>
    </div>
  `;
  div.addEventListener('click', () => openLightbox(i));
  div.setAttribute('tabindex', '0');
  div.setAttribute('role', 'button');
  div.setAttribute('aria-label', `View ${item.label}`);
  div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i); });
  galleryGrid.appendChild(div);
  revealObserver.observe(div);
});

function openLightbox(i) {
  lbIndex = i;
  showLightboxImg();
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}
function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}
function showLightboxImg() {
  const item = galleryData[lbIndex];
  lightboxImg.innerHTML = makeSVG(item, 480);
  lightboxCap.textContent = item.caption;
}
function lightboxNav(dir) {
  lbIndex = (lbIndex + dir + galleryData.length) % galleryData.length;
  showLightboxImg();
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => lightboxNav(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lightboxNav(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  }
});

/* ── Testimonials carousel ── */
const track     = document.getElementById('testTrack');
const dotsWrap  = document.getElementById('testDots');
const cards     = track ? track.querySelectorAll('.test-card') : [];
let   testIndex = 0;
let   testAuto;

function getVisible() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
}

function buildDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  const total = Math.ceil(cards.length / getVisible());
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'test-dot' + (i === testIndex ? ' active' : '');
    d.setAttribute('aria-label', `Go to slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
}

function goTo(i) {
  if (!track) return;
  const visible = getVisible();
  const total   = Math.ceil(cards.length / visible);
  testIndex = Math.max(0, Math.min(i, total - 1));
  const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 364;
  track.style.transform = `translateX(-${testIndex * visible * cardWidth}px)`;
  dotsWrap.querySelectorAll('.test-dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === testIndex));
}

function nextTest() { goTo((testIndex + 1) % Math.ceil(cards.length / getVisible())); }
function prevTest() { goTo((testIndex - 1 + Math.ceil(cards.length / getVisible())) % Math.ceil(cards.length / getVisible())); }

document.getElementById('testNext')?.addEventListener('click', () => { nextTest(); resetAuto(); });
document.getElementById('testPrev')?.addEventListener('click', () => { prevTest(); resetAuto(); });

function resetAuto() { clearInterval(testAuto); testAuto = setInterval(nextTest, 5000); }

if (track) {
  buildDots();
  resetAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

/* ── Copy to clipboard ── */
function copyText(id, btn) {
  const text = document.getElementById(id)?.textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied: ' + text, 'success');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!', 'success');
  });
}

/* ── Toast ── */
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className   = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── Back to top ── */
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Active nav link ── */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-links a');
const scrollSpy   = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinkEls.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => scrollSpy.observe(s));

/* ── Form validation & submission ── */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      field.classList.add('invalid');
      valid = false;
    }
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      field.classList.add('invalid');
      valid = false;
    }
  });
  return valid;
}

document.getElementById('volunteerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm(e.target)) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  showToast('Thank you for volunteering! We\'ll contact you within 48 hours. 🙏', 'success');
  e.target.reset();
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm(e.target)) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  showToast('Message sent! We\'ll get back to you soon. 💙', 'success');
  e.target.reset();
});

/* ── Smooth scroll for buttons that target sections ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

/* ── Expose copyText globally ── */
window.copyText = copyText;
