(() => {
  if (document.getElementById('site-ruler')) return;
  const pages = [
    { label: 'Accueil', href: '/#home', path: '/', section: 'home' },
    { label: 'Présentation', href: '/#get-to-know', path: '/', section: 'get-to-know' },
    { label: 'Formation', href: '/education.html', path: '/education.html' },
    { label: 'Projets', href: '/projects.html', path: '/projects.html' },
    { label: 'Expertise', href: '/expertize.html', path: '/expertize.html' },
    { label: 'Contact', href: '/contact.html', path: '/contact.html' },
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
    const about = document.getElementById('get-to-know');
    const isAbout = about && about.getBoundingClientRect().top <= window.innerHeight * 0.5;
    const path = window.location.pathname;
    const stage = document.querySelector('.home-experience');
    const visible = path !== '/' || Boolean(isAbout) || stage?.dataset.rulerVisible === 'true';
    const active = path === '/' ? (isAbout ? 1 : 0) : path === '/about.html' ? 1 : pages.findIndex((page) => page.path === path);
    fill.style.transform = `scaleY(${progress})`;
    cursor.style.transform = `translateY(${progress * track.clientHeight}px)`;
    ruler.dataset.visible = String(visible);
    ruler.inert = !visible;
    ruler.setAttribute('aria-hidden', String(!visible));
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
