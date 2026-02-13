(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on click (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Fake form submit (static site)
  window.APOYA = {
    fakeSubmit: (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('[name="name"]').value.trim();
      alert(`¡Gracias, ${name || '!' }!\n\nEste formulario es demo (sitio estático).\nDecime y lo conectamos a WhatsApp o a un backend.`);
      form.reset();
      return false;
    }
  };
})();

/* ================= SLIDER NOTICIAS + AUTOPLAY + DOTS ================= */

const track = document.querySelector('.news-track');
const slides = document.querySelectorAll('.news-card');
const dotsWrap = document.querySelector('.news-dots');

if (track && slides.length) {

    let index = 0;
    let autoplay;

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    // Crear dots
    let dots = [];
    if (dotsWrap) {
        dotsWrap.innerHTML = "";
        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "news-dot";
            dot.type = "button";
            dot.setAttribute("aria-label", `Ir a noticia ${i + 1}`);
            dot.addEventListener("click", () => {
                index = i;
                updateSlider();
                resetAutoplay();
            });
            dotsWrap.appendChild(dot);
            dots.push(dot);
        });
    }

    function updateDots() {
        if (!dots.length) return;
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }

    nextBtn.onclick = () => { nextSlide(); resetAutoplay(); };
    prevBtn.onclick = () => { prevSlide(); resetAutoplay(); };

    function startAutoplay() {
        autoplay = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplay);
        startAutoplay();
    }

    track.addEventListener("mouseenter", () => clearInterval(autoplay));
    track.addEventListener("mouseleave", startAutoplay);

    // Inicializar
    updateSlider();
    startAutoplay();
}

