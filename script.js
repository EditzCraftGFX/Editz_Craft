
// ── LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1600);
});

// ── CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.bento-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});


// ── NAVBAR SCROLL BLUR
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});


// ── LIGHTBOX
function openLb(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeLb(); });

// ── SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.bento-item, .tool-card, .process-step, .skill-chip, .contact-row').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px) scale(0.98)';
  el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`;
  revealObserver.observe(el);
});

// ── STATS counter
function animCount(el, target, suffix) {
  let start = 0;
  const dur = 1400;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / dur, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.querySelector('.hstat-num').innerHTML = Math.round(eased * target) + '<sup>' + suffix + '</sup>';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const stats = [
        { el: document.querySelectorAll('.hstat')[0], val: 300, suf: '+' },
        { el: document.querySelectorAll('.hstat')[1], val: 35, suf: '+' },
        { el: document.querySelectorAll('.hstat')[3], val: 100, suf: '%' },
      ];
      stats.forEach(s => animCount(s.el, s.val, s.suf));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if (document.querySelector('.hero-stats')) statsObserver.observe(document.querySelector('.hero-stats'));

// ── THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

function applyTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  iconSun.style.display = isLight ? 'none' : 'block';
  iconMoon.style.display = isLight ? 'block' : 'none';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

const saved = localStorage.getItem('theme');
applyTheme(saved === 'light');

themeToggle.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('light'));
});