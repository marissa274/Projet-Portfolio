document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const menu = document.querySelector<HTMLElement>("#navMenu");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});
