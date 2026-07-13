/* ============================================================
   CINE AURORA — script.js
   Coreografia: (1) parallax do hero  (2) scroll-reveal escalonado
                (3) nav reativa + progresso de scroll
   Zero dependências. Respeita prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  var progress = document.getElementById('progress-bar');
  var heroImg = document.getElementById('hero-img');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));

  /* ── 1. Menu mobile ───────────────────────────────────── */
  function closeDrawer() {
    if (!toggle || !drawer) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    drawer.hidden = true;
  }

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      drawer.hidden = open;
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeDrawer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeDrawer();
        toggle.focus();
      }
    });
  }

  /* ── 2. Scroll-reveal escalonado ──────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var step = parseInt(el.dataset.stagger || '0', 10);
        el.style.setProperty('--reveal-delay', (step * 90) + 'ms');
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* ── 3. Nav reativa, progresso e parallax (um só rAF) ── */
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  var ticking = false;
  var heroHeight = window.innerHeight;

  function onFrame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;

    // Nav ganha fundo + blur após sair do topo
    if (nav) nav.classList.toggle('is-scrolled', y > 40);

    // Linha de progresso
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';
    }

    // Parallax do hero — a imagem sobe mais devagar que a página
    if (heroImg && y < heroHeight) {
      heroImg.style.transform = 'translate3d(0,' + (y * 0.28) + 'px,0) scale(1.06)';
    }

    // Scrollspy: marca a seção visível na nav
    var active = null;
    var line = y + window.innerHeight * 0.35;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= line) active = sections[i].id;
    }
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + active);
    });
  }

  function requestFrame() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onFrame);
    }
  }

  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', function () {
    heroHeight = window.innerHeight;
    requestFrame();
  }, { passive: true });

  if (reduced && heroImg) heroImg.style.transform = 'none';
  requestFrame();

  /* ── 4. Smooth scroll com respeito ao movimento reduzido ─ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });
})();
