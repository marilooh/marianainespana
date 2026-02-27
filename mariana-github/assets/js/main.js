document.addEventListener('DOMContentLoaded', function () {

  // ── Sticky header shadow ──────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    });
  }

  // ── Mobile menu ───────────────────────────────────────────
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      toggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
      toggle.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Search bar toggle ─────────────────────────────────────
  const searchBtn = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', () => {
      const open = searchBar.classList.toggle('open');
      if (open && searchInput) searchInput.focus();
    });
  }

  // ── Simple search (searches post titles/excerpts in DOM) ──
  // For GitHub Pages, we use a client-side JSON search
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim() : '';
      if (q) window.location.href = '/search/?q=' + encodeURIComponent(q);
    });
  }

  // ── Card entrance animations ──────────────────────────────
  const animateTargets = document.querySelectorAll('.post-card, .resource-card');
  if ('IntersectionObserver' in window && animateTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    animateTargets.forEach(el => io.observe(el));
  } else {
    animateTargets.forEach(el => el.classList.add('visible'));
  }

  // ── Topic pill filter ─────────────────────────────────────
  const pills = document.querySelectorAll('.topic-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', function () {
      pills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Smooth read-more arrow ────────────────────────────────
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.querySelector('.arrow') && (this.querySelector('.arrow').style.marginLeft = '4px');
    });
  });

});

// ── Search page logic ─────────────────────────────────────
if (window.location.pathname.includes('/search/')) {
  const params = new URLSearchParams(window.location.search);
  const query  = params.get('q') || '';

  if (query) {
    document.querySelectorAll('.search-query-display').forEach(el => el.textContent = query);

    fetch('/search.json')
      .then(r => r.json())
      .then(posts => {
        const q = query.toLowerCase();
        const results = posts.filter(p =>
          (p.title  && p.title.toLowerCase().includes(q))  ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.tags   && p.tags.toLowerCase().includes(q))   ||
          (p.category && p.category.toLowerCase().includes(q))
        );

        const container = document.getElementById('searchResults');
        if (!container) return;

        if (results.length === 0) {
          container.innerHTML = '<p style="color:var(--text-light);padding:2rem 0;">No posts found for <strong>' + query + '</strong>. Try a different search.</p>';
          return;
        }

        container.innerHTML = results.map(p => `
          <article class="post-card visible">
            <div class="card-body">
              <div class="post-category">${p.category || 'Blog'}</div>
              <h3 class="card-title"><a href="${p.url}">${p.title}</a></h3>
              <p class="card-excerpt">${p.excerpt || ''}</p>
              <div class="post-meta">
                <span>${p.date}</span>
              </div>
            </div>
          </article>
        `).join('');
      })
      .catch(() => {
        const container = document.getElementById('searchResults');
        if (container) container.innerHTML = '<p>Search is loading — please try again in a moment.</p>';
      });
  }
}
