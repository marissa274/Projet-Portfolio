// details.ts — handles the "Details" modal only

const detailsModal = document.getElementById("detailsModal") as HTMLDivElement | null;
const detailsContent = document.getElementById("detailsContent") as HTMLDivElement | null;
const detailsClose = document.getElementById("detailsClose") as HTMLButtonElement | null;

const detailsImg = document.getElementById("detailsImg") as HTMLImageElement | null;
const detailsTitle = document.getElementById("detailsTitle") as HTMLHeadingElement | null;
const detailsDesc = document.getElementById("detailsDesc") as HTMLParagraphElement | null;
const detailsTags = document.getElementById("detailsTags") as HTMLDivElement | null;
const detailsLinks = document.getElementById("detailsLinks") as HTMLDivElement | null;

const detailButtons = document.querySelectorAll<HTMLButtonElement>(".js-open-details");

function openDetails(btn: HTMLButtonElement) {
  if (!detailsModal || !detailsImg || !detailsTitle || !detailsDesc || !detailsTags || !detailsLinks) return;

  const title = btn.dataset.title ?? "Project";
  const img = btn.dataset.img ?? "";
  const desc = btn.dataset.desc ?? "";
  const tags = (btn.dataset.tags ?? "")
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);

  const link1 = btn.dataset.link1;
  const link1label = btn.dataset.link1label ?? "Open link";

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
  if (!detailsModal) return;
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
