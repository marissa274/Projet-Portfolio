document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
  const menu = document.querySelector<HTMLElement>("#navMenu");
  const themeToggle = document.querySelector<HTMLButtonElement>(".theme-toggle");

  const applyTheme = (theme: "light" | "dark") => {
    document.body.classList.toggle("theme-dark", theme === "dark");
    document.body.classList.toggle("theme-light", theme === "light");

    if (!themeToggle) return;

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.innerHTML = `<i class="fa-solid fa-${isDark ? "sun" : "moon"}"></i>`;
  };

  const savedTheme = localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  });

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});
