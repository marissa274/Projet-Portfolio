document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#navMenu");
    if (!btn || !menu)
        return;
    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        btn.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
    });
});
