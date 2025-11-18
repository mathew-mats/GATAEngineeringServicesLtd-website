// Scroll animation
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Lazy loading images
const lazyImages = document.querySelectorAll('img.lazy');
const lazyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      lazyObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => lazyObserver.observe(img));
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const galleryImages = document.querySelectorAll(".gallery-item img");
let currentIndex = 0;

function showImage(index) {
  popupImg.src = galleryImages[index].src;
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    popup.style.display = "flex";
    currentIndex = index;
    showImage(currentIndex);
  });
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

document.addEventListener("keydown", (e) => {
  if (popup.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.click();
    else if (e.key === "ArrowLeft") prevBtn.click();
    else if (e.key === "Escape") popup.style.display = "none";
  }
});

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});
