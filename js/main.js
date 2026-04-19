/* ============================================================
   Psicoach v2.0 · interactions
   ============================================================ */

(() => {
  const nav = document.getElementById('nav');
  const toggle = nav?.querySelector('.nav__toggle');
  const yearEl = document.getElementById('y');
  const form = document.querySelector('.contact__form');

  /* Year */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Scrolled nav state */
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Reveal on scroll — tag every section child that benefits */
  const revealTargets = document.querySelectorAll(
    '.section__head, .manifesto__grid, .pillars li, .split__card, .svc, .timeline li, .voice, .about__stats > div, .contact__form, .contact__intro'
  );
  revealTargets.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = `${Math.min(i * 20, 180)}ms`;
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* Form — demo interaction (no backend) */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form__note');
      const nome = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg = form.querySelector('#msg').value.trim();

      const setNote = (text, ok = false) => {
        if (!note) return;
        note.style.color = ok ? 'var(--forest)' : 'var(--accent)';
        note.textContent = text;
      };

      if (!nome || !email || !msg) {
        setNote('Por favor, preencha nome, e-mail e mensagem.');
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        setNote('Confirme o e-mail informado.');
        return;
      }
      setNote('Mensagem recebida. Retornaremos em até um dia útil.', true);
      form.reset();
    });
  }

  /* Duplicate clients marquee content for seamless loop */
  document.querySelectorAll('.clients__row').forEach(row => {
    const clone = row.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    // Append clone children inside the same row so the animation transforms uniformly
    Array.from(clone.children).forEach(li => row.appendChild(li));
  });

  /* Subtle parallax on hero decor */
  const decor = document.querySelector('.hero__decor svg');
  if (decor && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = Math.min(window.scrollY, 600);
      decor.style.transform = `translateY(${y * 0.08}px) rotate(${y * 0.03}deg)`;
    }, { passive: true });
  }
})();
