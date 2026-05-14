// Initial Feather Icons replacement
feather.replace();

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Tutup menu kalau klik salah satu link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".scroll-reveal");

const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      // Optional: observer.unobserve(entry.target); // Keep observing if you want it to animate every time
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Simple Tilt Effect for Project Cards
// const tiltCards = document.querySelectorAll(".tilt"); // Assuming I added 'tilt' class to project cards or skill cards

// tiltCards.forEach((card) => {
//   card.addEventListener("mousemove", (e) => {
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // Calculate center
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     // Calculate rotation values (limit to small angles)
//     const rotateX = ((y - centerY) / centerY) * -5; // Max -5 to 5 deg
//     const rotateY = ((x - centerX) / centerX) * 5;

//     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
//   });

//   card.addEventListener("mouseleave", () => {
//     card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
//   });
// });

// Smooth Scroll for Anchor Links (just in case CSS smooth-scroll isn't enough or for more control)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Project Image Slider
function initSliders() {
  document.querySelectorAll('.project-image').forEach(container => {
    const imgs = container.querySelectorAll('.project-thumb');
    const dotsContainer = container.querySelector('.slider-dots');

    // Buat dots
    imgs.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(container, i));
      dotsContainer.appendChild(dot);
    });

    // Sembunyikan tombol jika hanya 1 gambar
    if (imgs.length <= 1) {
      container.querySelectorAll('.slider-btn').forEach(btn => btn.style.display = 'none');
      dotsContainer.style.display = 'none';
    }
  });
}

function slideProject(btn, direction) {
  const container = btn.closest('.project-image');
  const imgs = container.querySelectorAll('.project-thumb');
  const dots = container.querySelectorAll('.dot');
  let current = [...imgs].findIndex(img => img.classList.contains('active'));

  imgs[current].classList.remove('active');
  dots[current].classList.remove('active');

  current = (current + direction + imgs.length) % imgs.length;

  imgs[current].classList.add('active');
  dots[current].classList.add('active');

  feather.replace(); // re-render icons
}

function goToSlide(container, index) {
  const imgs = container.querySelectorAll('.project-thumb');
  const dots = container.querySelectorAll('.dot');
  imgs.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  imgs[index].classList.add('active');
  dots[index].classList.add('active');
}

initSliders();
