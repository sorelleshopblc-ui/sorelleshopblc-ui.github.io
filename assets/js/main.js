document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-navigation");
  const links = document.querySelectorAll(".site-navigation a");

  if (!menuButton || !navigation) return;

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  };

  const openMenu = () => {
    navigation.classList.add("is-open");
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.textContent = "Close";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
});
