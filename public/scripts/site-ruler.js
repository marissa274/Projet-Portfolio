(() => {
  if (document.getElementById('site-ruler')) return;
  const pages = [
    { label: 'Accueil', href: '/#home', path: '/', section: 'home' },
    { label: 'Présentation', href: '/#get-to-know', path: '/', section: 'about' },
    { label: 'Formation', href: '/#education', path: '/education.html', section: 'education' },
    { label: 'Projets', href: '/projects.html', path: '/projects.html', section: 'projects' },
    { label: 'Expertise', href: '/expertize.html', path: '/expertize.html', section: 'expertise' },
    { label: 'Contact', href: '/contact.html', path: '/contact.html', section: 'contact' },
  ];
  const ruler = document.createElement('aside');
  ruler.id = 'site-ruler';
  ruler.className = 'site-ruler';
  ruler.dataset.visible = 'false';
  ruler.inert = true;
  ruler.setAttribute('aria-label', 'Navigation et progression du portfolio');
  const track = document.createElement('div');
  track.className = 'site-ruler-track';
  track.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 51; index++) {
    const tick = document.createElement('span');
    tick.className = `site-ruler-tick${index % 5 === 0 ? ' major' : ''}`;
    track.appendChild(tick);
  }
  const fill = document.createElement('span');
  fill.className = 'site-ruler-fill';
  track.appendChild(fill);
  const cursor = document.createElement('span');
  cursor.className = 'site-ruler-cursor';
  track.appendChild(cursor);
  ruler.appendChild(track);
  const navigation = document.createElement('nav');
  navigation.className = 'site-ruler-pages';
  navigation.setAttribute('aria-label', 'Pages du portfolio');
  const links = pages.map((page, index) => {
    const link = document.createElement('a');
    link.href = page.href;
    link.style.top = `${index / (pages.length - 1) * 100}%`;
    link.setAttribute('aria-label', page.label);
    const label = document.createElement('span');
    label.textContent = page.label;
    link.appendChild(label);
    navigation.appendChild(link);
    return link;
  });
  ruler.appendChild(navigation);
  document.body.appendChild(ruler);
  let frame = 0;
  const update = () => {
    frame = 0;
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maximum ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
    const path = window.location.pathname;
    let section = path === '/' ? 'home' : path === '/about.html' ? 'about' : pages.find((page) => page.path === path)?.section ?? 'home';
    if (path === '/') {
      for (const candidate of document.querySelectorAll('[data-portfolio-section]')) {
        const bounds = candidate.getBoundingClientRect();
        if (bounds.top <= window.innerHeight * 0.5 && bounds.bottom > 0 && getComputedStyle(candidate).visibility !== 'hidden') {
          section = candidate.dataset.portfolioSection;
        }
      }
    }
    const stage = document.querySelector('.home-experience');
    const visible = path !== '/' || section !== 'home' || stage?.dataset.rulerVisible === 'true';
    const active = pages.findIndex((page) => page.section === section);
    fill.style.transform = `scaleY(${progress})`;
    cursor.style.transform = `translateY(${progress * track.clientHeight}px)`;
    ruler.dataset.visible = String(visible);
    ruler.inert = !visible;
    ruler.setAttribute('aria-hidden', String(!visible));
    if (document.body.dataset.portfolioSection !== section) {
      document.body.dataset.portfolioSection = section;
      window.dispatchEvent(new Event('portfolio:section-change'));
    }
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };
  const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('portfolio:ruler-change', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate, { once: true });
  update();
})();
