const modal = document.getElementById("photo-modal");
const modalImage = document.getElementById("modal-image");
const photos = [...document.querySelectorAll(".galeri")];
let current = 0;

function show(i) {
  current = (i + photos.length) % photos.length; 
  modalImage.src = photos[current].src;
  modalImage.alt = photos[current].alt;
}

function openAt(i) {
  show(i);
  modal.showModal();
}

photos.forEach((photo, i) => {
  photo.tabIndex = 0; 
  photo.setAttribute("role", "button");
  photo.addEventListener("click", () => openAt(i));
  photo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAt(i);
    }
  });
});

document.getElementById("photo-close").addEventListener("click", () => modal.close());
document.getElementById("photo-prev").addEventListener("click", () => show(current - 1));
document.getElementById("photo-next").addEventListener("click", () => show(current + 1));

modal.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

modal.addEventListener("close", () => {
  modalImage.src = "";
});
