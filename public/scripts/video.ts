const modal = document.getElementById("videoModal") as HTMLDivElement | null;
const modalContent = document.getElementById("videoModalContent") as HTMLDivElement | null;
const closeBtn = document.getElementById("closeDemo") as HTMLButtonElement | null;

const video = document.getElementById("demoVideo") as HTMLVideoElement | null;
const source = document.getElementById("demoSource") as HTMLSourceElement | null;

const openButtons = document.querySelectorAll<HTMLButtonElement>(".js-open-video");

function openModalWith(src: string) {
  if (!modal || !video || !source) return;

  source.src = src;
  video.load();               // important
  modal.classList.remove("hidden");
  video.currentTime = 0;

  void video.play().catch(() => {
    // si autoplay est bloqué, l’utilisateur clique Play
  });
}



function closeModal() {
  if (!modal || !video) return;
  video.pause();
  modal.classList.add("hidden");
}

if (modal && modalContent && closeBtn && video && source) {
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.dataset.video;
      if (src) openModalWith(src);
    });
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener("click", () => closeModal());
  modalContent.addEventListener("click", (e) => e.stopPropagation());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}
