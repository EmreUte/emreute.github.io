// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});
 
// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});
 
// ===== TYPED EFFECT =====
const phrases = [
  'Computer Science',
  'Computer Architecture',
  'High-performance Computing',
  'Compiler Frontend',
  'Minecraft LLM Builder',
];
const typedEl = document.getElementById('typed');
let phraseIdx = 0, charIdx = 0, deleting = false;
 
function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();
 
// ===== FULL-PAGE SPACE BACKGROUND =====
(function () {
  const canvas = document.getElementById('space-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const stars = Array.from({ length: 220 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.2 + 0.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.6 + 0.2,
  }));

  const brightStars = Array.from({ length: 20 }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.5 + 1.2,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.3 + 0.1,
    color: Math.random() > 0.5 ? '91,143,255' : '167,139,250',
  }));

  // Blobs spread across the full viewport with slow drift
  const blobs = [
    { x: 0.10, y: 0.15, r: 0.42, color: '91,143,255',  alpha: 0.10, ds: 0.07, dp: 0.0 },
    { x: 0.82, y: 0.30, r: 0.38, color: '167,139,250', alpha: 0.09, ds: 0.05, dp: 1.2 },
    { x: 0.50, y: 0.55, r: 0.35, color: '91,143,255',  alpha: 0.07, ds: 0.06, dp: 2.4 },
    { x: 0.20, y: 0.75, r: 0.32, color: '167,139,250', alpha: 0.08, ds: 0.04, dp: 0.8 },
    { x: 0.75, y: 0.80, r: 0.30, color: '91,143,255',  alpha: 0.07, ds: 0.08, dp: 1.8 },
    { x: 0.60, y: 0.10, r: 0.26, color: '167,139,250', alpha: 0.08, ds: 0.06, dp: 3.2 },
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    const W = canvas.width, H = canvas.height;
    const t = performance.now() / 1000;
    ctx.clearRect(0, 0, W, H);

    // Nebula with slow horizontal drift
    blobs.forEach(b => {
      const bx = (b.x + Math.sin(t * b.ds + b.dp) * 0.03) * W;
      const by = b.y * H;
      const grd = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * W);
      grd.addColorStop(0,   `rgba(${b.color},${b.alpha})`);
      grd.addColorStop(0.5, `rgba(${b.color},${b.alpha * 0.4})`);
      grd.addColorStop(1,   `rgba(${b.color},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });

    // Dim twinkling stars
    stars.forEach(s => {
      const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,230,255,${alpha})`;
      ctx.fill();
    });

    // Bright accent stars with glow halos
    brightStars.forEach(s => {
      const alpha = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      const glow = ctx.createRadialGradient(s.x*W, s.y*H, 0, s.x*W, s.y*H, s.r * 4);
      glow.addColorStop(0,   `rgba(${s.color},${alpha * 0.9})`);
      glow.addColorStop(0.4, `rgba(${s.color},${alpha * 0.3})`);
      glow.addColorStop(1,   `rgba(${s.color},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll(
  '.timeline-card, .project-card, .skill-group, .edu-card, .contact-card, .about-text, .about-edu'
);
fadeEls.forEach(el => el.classList.add('fade-in'));
 
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach(el => observer.observe(el));
