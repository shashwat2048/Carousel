document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".images");
  const dotsContainer = document.querySelector(".dots");
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideTimeout;

  function updateSlidePosition() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    console.log("Current Index:", currentIndex);
    const bgImgBox = document.getElementById(`img${currentIndex + 1}`).children[0];
    const bgImg = bgImgBox.getAttribute("src");
    document.body.style.backgroundImage = `url(${bgImg})`;
  }

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function startAutoSlide() {
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlidePosition();
      updateDots();
      startAutoSlide(); 
    }, 5000);
  }

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === currentIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlidePosition();
      updateDots();
      startAutoSlide(); 
    });
    dotsContainer.appendChild(dot);
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
    updateDots();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
    updateDots();
    startAutoSlide();
  });

  startAutoSlide();
});
