// app.js — seguro, simple y sin romper navegación
document.addEventListener("DOMContentLoaded", () => {
  // ===== Dropdowns (desktop) =====
  const dropdowns = document.querySelectorAll(".dropdown");

  function closeAllDropdowns(except = null) {
    dropdowns.forEach(dd => {
      if (dd !== except) dd.classList.remove("open");
    });
  }

  dropdowns.forEach(dd => {
    const btn = dd.querySelector(".dropbtn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      // IMPORTANTE: no tocar links <a>, solo el botón del dropdown
      e.stopPropagation();

      const isOpen = dd.classList.contains("open");
      closeAllDropdowns();
      dd.classList.toggle("open", !isOpen);

      // Accesibilidad
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Cerrar dropdown al click afuera
  document.addEventListener("click", () => closeAllDropdowns());

  // Evitar que un click dentro del menú cierre el dropdown
  document.querySelectorAll(".dropdown-menu").forEach(menu => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });

  // ===== Mobile menu =====
  const btnMobile = document.getElementById("btnMobile");
  const menuMobile = document.getElementById("menuMobile");

  if (btnMobile && menuMobile) {
    btnMobile.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menuMobile.classList.toggle("open");
      btnMobile.setAttribute("aria-expanded", String(open));
    });

    // Cerrar mobile menu al click afuera
    document.addEventListener("click", () => menuMobile.classList.remove("open"));
    menuMobile.addEventListener("click", (e) => e.stopPropagation());
  }
});
