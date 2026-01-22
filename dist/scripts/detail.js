// details.ts — handles the "Details" modal only
const detailsModal = document.getElementById("detailsModal");
const detailsContent = document.getElementById("detailsContent");
const detailsClose = document.getElementById("detailsClose");
const detailsImg = document.getElementById("detailsImg");
const detailsTitle = document.getElementById("detailsTitle");
const detailsDesc = document.getElementById("detailsDesc");
const detailsTags = document.getElementById("detailsTags");
const detailsLinks = document.getElementById("detailsLinks");
const detailButtons = document.querySelectorAll(".js-open-details");
function openDetails(btn) {
    var _a, _b, _c, _d, _e;
    if (!detailsModal || !detailsImg || !detailsTitle || !detailsDesc || !detailsTags || !detailsLinks)
        return;
    const title = (_a = btn.dataset.title) !== null && _a !== void 0 ? _a : "Project";
    const img = (_b = btn.dataset.img) !== null && _b !== void 0 ? _b : "";
    const desc = (_c = btn.dataset.desc) !== null && _c !== void 0 ? _c : "";
    const tags = ((_d = btn.dataset.tags) !== null && _d !== void 0 ? _d : "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
    const link1 = btn.dataset.link1;
    const link1label = (_e = btn.dataset.link1label) !== null && _e !== void 0 ? _e : "Open link";
    // Fill content
    detailsTitle.textContent = title;
    detailsDesc.textContent = desc;
    detailsImg.src = img;
    detailsImg.alt = `${title} preview`;
    // Render tags
    detailsTags.innerHTML = "";
    tags.forEach(t => {
        const span = document.createElement("span");
        span.className = "details-tag";
        span.textContent = t;
        detailsTags.appendChild(span);
    });
    // Render links
    detailsLinks.innerHTML = "";
    if (link1) {
        const a = document.createElement("a");
        a.href = link1;
        a.target = "_blank";
        a.rel = "noopener";
        a.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${link1label}`;
        detailsLinks.appendChild(a);
    }
    // Open modal
    detailsModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}
function closeDetails() {
    if (!detailsModal)
        return;
    detailsModal.classList.add("hidden");
    document.body.style.overflow = "";
}
// Bind events
if (detailsModal && detailsContent && detailsClose) {
    detailButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openDetails(btn);
        });
    });
    detailsClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDetails();
    });
    // click outside closes
    detailsModal.addEventListener("click", () => closeDetails());
    detailsContent.addEventListener("click", (e) => e.stopPropagation());
    // ESC closes
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !detailsModal.classList.contains("hidden")) {
            closeDetails();
        }
    });
}
