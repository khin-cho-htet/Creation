const reveals = document.querySelectorAll(".reveal");
const portraitCard = document.querySelector(".portrait-card");
const progressBar = document.querySelector(".scroll-progress");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  observer.observe(item);
});

function updateScrollProgress() {
  if (!progressBar) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });

window.addEventListener("pointermove", (event) => {
  if (!portraitCard || window.innerWidth < 821) {
    return;
  }

  const { innerWidth, innerHeight } = window;
  const rotateY = ((event.clientX / innerWidth) - 0.5) * 12;
  const rotateX = ((event.clientY / innerHeight) - 0.5) * -10;

  portraitCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

window.addEventListener("pointerleave", () => {
  if (portraitCard) {
    portraitCard.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  }
});
