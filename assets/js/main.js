document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const menuText = document.querySelector(".menu-text");
  const menu = document.querySelector(".mobile-menu");
  const closeButton = document.querySelector(".menu-close");
  const backdrop = document.querySelector(".menu-backdrop");
  const menuLinks = document.querySelectorAll(".mobile-menu > a");
  const bottomLinks = document.querySelectorAll(".bottom-nav a");
  const sections = document.querySelectorAll("main section[id]");
  const year = document.querySelector("#current-year");

  const setMenuState = (isOpen) => {
    if (!menuButton || !menu || !backdrop) return;

    menu.classList.toggle("is-open", isOpen);
    menu.setAttribute("aria-hidden", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
    backdrop.hidden = !isOpen;

    if (menuText) menuText.textContent = isOpen ? "Close" : "Menu";
    if (isOpen && closeButton) closeButton.focus();
  };

  menuButton?.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("is-open"));
  });

  closeButton?.addEventListener("click", () => setMenuState(false));
  backdrop?.addEventListener("click", () => setMenuState(false));
  menuLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  document.querySelectorAll(".product-details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll(".product-details[open]").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const activeTab = ["collections", "bags", "girls-items", "rental"].includes(id)
            ? "shop"
            : id;

          bottomLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === activeTab);
          });
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  if (year) year.textContent = String(new Date().getFullYear());
});
