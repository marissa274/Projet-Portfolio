document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#navMenu");
    const themeToggle = document.querySelector(".theme-toggle");
    const applyTheme = (theme) => {
        document.body.classList.toggle("theme-dark", theme === "dark");
        document.body.classList.toggle("theme-light", theme === "light");
        if (!themeToggle)
            return;
        const isDark = theme === "dark";
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
        themeToggle.innerHTML = `<i class="fa-solid fa-${isDark ? "sun" : "moon"}"></i>`;
    };
    const savedTheme = localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
    applyTheme(savedTheme);
    themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
        localStorage.setItem("portfolio-theme", nextTheme);
        applyTheme(nextTheme);
    });
    if (!btn || !menu)
        return;
    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        btn.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
    });
});
