document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const backdrop = document.querySelector(".drawer-backdrop");
  const menuDrawer = document.querySelector(".menu-drawer");
  const bagDrawer = document.querySelector(".bag-drawer");
  const menuToggle = document.querySelector(".menu-toggle");
  const bagToggle = document.querySelector(".bag-toggle");
  const menuClose = menuDrawer?.querySelector(".drawer-close");
  const bagClose = document.querySelector(".bag-close");
  const bagCount = document.querySelector(".bag-count");
  const bagItems = document.querySelector(".bag-items");
  const bagEmpty = document.querySelector(".bag-empty");
  const sendInquiry = document.querySelector(".send-inquiry");
  const clearBag = document.querySelector(".clear-bag");
  const bottomLinks = document.querySelectorAll(".bottom-nav a");
  const observedSections = document.querySelectorAll("main section[id]");
  const year = document.querySelector("#current-year");

  const storageKey = "sorelleInquiryBag";
  let inquiryBag = [];

  try {
    inquiryBag = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(inquiryBag)) inquiryBag = [];
  } catch {
    inquiryBag = [];
  }

  const saveBag = () => {
    localStorage.setItem(storageKey, JSON.stringify(inquiryBag));
  };

  const closeDrawers = () => {
    [menuDrawer, bagDrawer].forEach((drawer) => {
      drawer?.classList.remove("is-open");
      drawer?.setAttribute("aria-hidden", "true");
    });
    menuToggle?.setAttribute("aria-expanded", "false");
    bagToggle?.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.hidden = true;
    body.classList.remove("drawer-open");
  };

  const openDrawer = (drawer, toggle) => {
    closeDrawers();
    drawer?.classList.add("is-open");
    drawer?.setAttribute("aria-hidden", "false");
    toggle?.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.hidden = false;
    body.classList.add("drawer-open");
  };

  const updateAddButtons = () => {
    const ids = new Set(inquiryBag.map((item) => item.id));
    document.querySelectorAll(".add-to-bag").forEach((button) => {
      const added = ids.has(button.dataset.id);
      button.classList.toggle("added", added);
      if (button.classList.contains("heart-button")) {
        button.textContent = added ? "♥" : "♡";
      } else {
        button.textContent = added ? "Added to inquiry" : "Add to inquiry";
      }
      button.setAttribute("aria-pressed", String(added));
    });
  };

  const updateInquiryLink = () => {
    if (!sendInquiry) return;
    if (!inquiryBag.length) {
      sendInquiry.href = "mailto:sorelleshopblc@gmail.com?subject=Sorelle%20Shop%20Inquiry";
      return;
    }

    const itemList = inquiryBag.map((item, index) => `${index + 1}. ${item.name}`).join("\n");
    const subject = encodeURIComponent("Sorellé Shop Item Inquiry");
    const message = encodeURIComponent(
      `Good day,\n\nI would like to ask about the following Sorellé Shop items:\n\n${itemList}\n\nPlease send me the price and availability. Thank you.`
    );
    sendInquiry.href = `mailto:sorelleshopblc@gmail.com?subject=${subject}&body=${message}`;
  };

  const renderBag = () => {
    if (!bagItems || !bagCount || !bagEmpty) return;

    bagCount.textContent = String(inquiryBag.length);
    bagCount.setAttribute("aria-label", `${inquiryBag.length} item${inquiryBag.length === 1 ? "" : "s"}`);
    bagEmpty.hidden = inquiryBag.length > 0;
    bagItems.innerHTML = "";

    inquiryBag.forEach((item) => {
      const row = document.createElement("div");
      row.className = "bag-item";
      row.innerHTML = `
        <img src="${item.image}" alt="">
        <div><strong>${item.name}</strong><small>Saved for inquiry</small></div>
        <button class="remove-item" type="button" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>
      `;
      bagItems.appendChild(row);
    });

    updateInquiryLink();
    updateAddButtons();
  };

  document.querySelectorAll(".add-to-bag").forEach((button) => {
    button.addEventListener("click", () => {
      const item = {
        id: button.dataset.id,
        name: button.dataset.name,
        image: button.dataset.image,
      };

      const existingIndex = inquiryBag.findIndex((saved) => saved.id === item.id);
      if (existingIndex >= 0) {
        inquiryBag.splice(existingIndex, 1);
      } else {
        inquiryBag.push(item);
      }

      saveBag();
      renderBag();
    });
  });

  bagItems?.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-item");
    if (!removeButton) return;
    inquiryBag = inquiryBag.filter((item) => item.id !== removeButton.dataset.id);
    saveBag();
    renderBag();
  });

  clearBag?.addEventListener("click", () => {
    inquiryBag = [];
    saveBag();
    renderBag();
  });

  menuToggle?.addEventListener("click", () => openDrawer(menuDrawer, menuToggle));
  bagToggle?.addEventListener("click", () => openDrawer(bagDrawer, bagToggle));
  menuClose?.addEventListener("click", closeDrawers);
  bagClose?.addEventListener("click", closeDrawers);
  backdrop?.addEventListener("click", closeDrawers);

  menuDrawer?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeDrawers));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawers();
  });

  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll("details[open]").forEach((other) => {
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
          const active = ["shop", "all-products", "rental", "about"].includes(id) ? "shop" : id;
          bottomLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === active);
          });
        });
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0.01 }
    );
    observedSections.forEach((section) => observer.observe(section));
  }

  if (year) year.textContent = String(new Date().getFullYear());
  renderBag();
});
