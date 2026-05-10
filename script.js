'use strict';

// ── PHOTO BREAK PARALLAX ─────────────────────────────────────────
// Background infinite loop is CSS-only (no JS needed).
// Only the mid-page photo section uses JS parallax.
const pbInner    = document.getElementById('pbInner');
const photoBreak = pbInner ? pbInner.closest('.photo-break') : null;
let ticking = false;

window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    if (photoBreak && pbInner) {
      const rect   = photoBreak.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      pbInner.style.transform = `translateY(${center * 0.22}px)`;
    }
    ticking = false;
  });
}, { passive: true });

// ── SCROLL REVEAL ────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNTDOWN ────────────────────────────────────────────────────
const weddingDate = new Date('2026-06-06T09:00:00+07:00');
const cdDays    = document.getElementById('cdDays');
const cdHours   = document.getElementById('cdHours');
const cdMins    = document.getElementById('cdMinutes');
const cdSecs    = document.getElementById('cdSeconds');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = weddingDate - Date.now();
  if (diff <= 0) {
    document.getElementById('countdownGrid').innerHTML =
      `<p style="font-family:'Great Vibes',cursive;font-size:2rem;color:var(--gold-lt)">
         Alhamdulillah — Hari Bahagia Telah Tiba ♡
       </p>`;
    return;
  }
  cdDays.textContent  = pad(Math.floor(diff / 86400000));
  cdHours.textContent = pad(Math.floor(diff % 86400000 / 3600000));
  cdMins.textContent  = pad(Math.floor(diff % 3600000  / 60000));
  cdSecs.textContent  = pad(Math.floor(diff % 60000    / 1000));
}

tick();
setInterval(tick, 1000);

// ── SMOOTH ANCHOR ────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
