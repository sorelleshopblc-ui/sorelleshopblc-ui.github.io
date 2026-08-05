document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-navigation");
  const navigationLinks = document.querySelectorAll(".site-navigation a");

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });

  navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    });
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navigation.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }
  });
});
