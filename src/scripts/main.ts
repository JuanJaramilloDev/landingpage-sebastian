document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // SCROLL SUAVE
  // ==========================================

  const scrollLinks = document.querySelectorAll<HTMLElement>(
    "[data-scroll]"
  );

  scrollLinks.forEach((link) => {

    link.addEventListener("click", () => {

      const targetId = link.dataset.scroll;

      if (!targetId) return;

      const target = document.getElementById(targetId);

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    });

  });


  // ==========================================
  // ANIMACIONES AL HACER SCROLL
  // ==========================================

  const animatedElements = document.querySelectorAll<HTMLElement>(
    "[data-reveal]"
  );

  // Si el navegador no soporta IntersectionObserver,
  // mostramos todo inmediatamente.
  if (!("IntersectionObserver" in window)) {

    animatedElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  } else {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.05,
      }
    );


    animatedElements.forEach((element) => {

      observer.observe(element);

    });

  }


  // ==========================================
  // ESTADÍSTICAS
  // ==========================================

  const counters = document.querySelectorAll<HTMLElement>(
    "[data-counter]"
  );


  if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          const target = Number(element.dataset.counter);

          if (Number.isNaN(target)) return;

          let current = 0;

          const duration = 1200;
          const steps = 40;
          const increment = target / steps;
          const interval = duration / steps;


          const counter = setInterval(() => {

            current += increment;

            if (current >= target) {

              current = target;

              clearInterval(counter);

            }

            element.textContent = `${Math.floor(current)}+`;

          }, interval);


          counterObserver.unobserve(element);

        });

      },
      {
        threshold: 0.5,
      }
    );


    counters.forEach((counter) => {

      counterObserver.observe(counter);

    });

  }

});