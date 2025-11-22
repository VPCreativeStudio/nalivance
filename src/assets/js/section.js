"use strict";

//Navigation with event delegation
document.querySelector("nav").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-href")) {
    const id = e.target.getAttribute("href");
    const clicked = document.getElementById(id);
    clicked.scrollIntoView({
      behavior: "smooth",
    });
  }
});

const allSection = document.querySelectorAll("section");
const allNavItem = document.querySelectorAll(".nav-item");
const header = document.querySelector("header");

// Section observer
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const curId = entry.target.id;

      // Toggle active state on section itself
      entry.target.classList.toggle("active", entry.isIntersecting);

      // Toggle nav item highlight
      allNavItem.forEach((nav) => {
        const href = nav.children[0].getAttribute("href").replace("#", "");
        nav.classList.toggle(
          "selected",
          entry.isIntersecting && href === curId
        );
      });

      if (entry.target === allSection[allSection.length - 1]) {
        header.classList.toggle("scrolled", !entry.isIntersecting);
      }
    });
  },
  {
    root: null,
    threshold: 0.15, // section must be at least 15% visible
  }
);

allSection.forEach((section) => {
  sectionObserver.observe(section);
});

// Header observer (watch top of page)
const topSentinel = document.createElement("div");
topSentinel.style.position = "absolute";
topSentinel.style.top = "0";
topSentinel.style.width = "100%";
topSentinel.style.height = "1px";
document.body.prepend(topSentinel);

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      header.classList.toggle("scrolled", !entry.isIntersecting);
    });
  },
  { root: null, threshold: 0 }
);

headerObserver.observe(topSentinel);
