import { newObj } from "./calc";
import sendForm from "./form";

const popups = () => {
  const itemsWrap = document.querySelector(".sentence");
  const items = itemsWrap.querySelectorAll(".col-md-4");
  const popupCall = document.querySelector(".popup-call");
  const popupDiscount = document.querySelector(".popup-discount");
  const popupCheck = document.querySelector(".popup-check");
  const popupCons = document.querySelector(".popup-consultation");

  let json;

  document.body.addEventListener("click", event => {
    //event.preventDefault();
    const target = event.target;

    if (target && target.classList.contains("add-sentence-btn")) {
      target.remove();
      items.forEach(item =>
        item.classList.contains("hidden")
          ? item.classList.remove("hidden")
          : null
      );
    }

    if (target && target.classList.contains("discount-btn")) {
      popupDiscount.style.display = "block";
    }

    if (target && target.classList.contains("director-btn")) {
      popupCons.style.display = "block";
    }

    if (target && target.classList.contains("call-btn")) {
      event.preventDefault();
      popupCall.style.display = "block";
    }

    if (target && target.classList.contains("check-btn")) {
      popupCheck.style.display = "block";
    }

    if (target && target.classList.contains("construct-btn")) {
      json = newObj;
    }

    if (
      target &&
      (target.classList.contains("popup-close") ||
        target.classList.contains("popup"))
    ) {
      popupDiscount.style.display = "none";
      popupCall.style.display = "none";
      popupCheck.style.display = "none";
      popupCons.style.display = "none";
    }
  });

  document.body.addEventListener("submit", e => {
    e.preventDefault();

    if (e.target.closest(".director-form")) {
      json = {};
      let oneData = new FormData(e.target);
      oneData.forEach((value, key) => {
        json[key] = value;
      });
      return;
    }

    if (e.target.closest(".popup-content")) {
      sendForm(e.target, json);
      return;
    }

    sendForm(e.target);
  });
};

export default popups;
