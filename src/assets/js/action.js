"use strict";

const actionButtons = document.querySelectorAll(".service-item");
const tabContent = document.querySelectorAll(".service-content-list");

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-tab");
    // Remove active from all tabs and contents
    actionButtons.forEach((t) => t.classList.remove("active"));
    tabContent.forEach((c) => c.classList.remove("active"));
    // Add active to clicked tab and its content
    button.classList.add("active");
    document
      .querySelector(`.service-content-list[data-tab="${target}"]`)
      .classList.add("active");
  });
});
