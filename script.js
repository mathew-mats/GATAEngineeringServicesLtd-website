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
// Gallery / popup: only initialize if required elements exist
{
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popupImg");
  const closePopup = document.getElementById("closePopup");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const galleryImages = document.querySelectorAll(".gallery-item img");

  if (popup && popupImg && closePopup && nextBtn && prevBtn && galleryImages.length > 0) {
    let currentIndex = 0;

    function showImage(index) {
      // guard index
      if (index < 0 || index >= galleryImages.length) return;
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
  }
}

// Mobile hamburger toggle: guard for missing elements
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

// Adjust body padding to accommodate fixed header so content doesn't sit under it
function adjustBodyPaddingForFixedHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  const height = header.offsetHeight;
  // set padding-top on body to header height
  document.body.style.paddingTop = height + 'px';
}

// call on load/resize to keep layout stable
window.addEventListener('load', adjustBodyPaddingForFixedHeader);
window.addEventListener('resize', adjustBodyPaddingForFixedHeader);

if (mobileMenu && navList) {
  mobileMenu.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('active');
    // Toggle visual state on the button (hamburger -> X)
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // If opened, move focus to the first nav link for accessibility
    if (isOpen) {
      const firstLink = navList.querySelector('a');
      if (firstLink) firstLink.focus();
    }
    // Header height may change when nav opens (mobile), adjust padding
    adjustBodyPaddingForFixedHeader();
  });

  // Keyboard support: toggle on Enter or Space when the button is focused
  mobileMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      mobileMenu.click();
    }
  });

  // Close mobile menu when a nav link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-expanded', 'false');
        // adjust padding after closing
        adjustBodyPaddingForFixedHeader();
      }
    });
  });

  // Optional: close when clicking outside the nav on mobile
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (navList.classList.contains('active') && !navList.contains(target) && target !== mobileMenu && !mobileMenu.contains(target)) {
      navList.classList.remove('active');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-expanded', 'false');
    }
  });
}

