let newObj;
const calc = () => {
  const accordion = document.querySelector("#accordion");
  const switcher = accordion.querySelectorAll(".onoffswitch-label");
  const checkBox = document.querySelectorAll(".onoffswitch-checkbox");
  const secondOption = accordion.querySelector(".second-option");
  const finalValue = document.querySelector("#calc-result");
  const formControl = document.querySelectorAll(".form-control");
  const finalDistance = accordion.querySelector("input[type=text]");

  //calc
  let data = {
    doubleTank: false,
    tankBottom: true,
    distance: 0,
    finalPrice: 0,

    changeSwitcher: function() {
      this.firsDiametr =
        formControl[0].options[formControl[0].selectedIndex].textContent;
      this.firstQuantity =
        formControl[1].options[formControl[1].selectedIndex].textContent;
      // Выбор двойной или просто колодец
      if (!checkBox[0].hasAttribute("checked")) {
        secondOption.style.display = "block";
        this.finalPrice = 15000;
        this.doubleTank = true;
        this.secondDiametr =
          formControl[2].options[formControl[2].selectedIndex].textContent;
        this.secondQuantity =
          formControl[3].options[formControl[3].selectedIndex].textContent;
      } else {
        secondOption.style.display = "none";
        this.finalPrice = 10000;
        this.doubleTank = false;
        delete this.secondDiametr;
        delete this.secondQuantity;
      }
    },

    changeQuantity: function() {
      //диаметры и количества
      if (this.firsDiametr == "2 метра") this.finalPrice *= 1.2;
      if (this.firstQuantity == "2 штуки") this.finalPrice *= 1.3;
      if (this.firstQuantity == "3 штуки") this.finalPrice *= 1.5;

      if (this.doubleTank == true) {
        if (this.secondDiametr == "2 метра") this.finalPrice *= 1.2;
        if (this.secondQuantity == "2 штуки") this.finalPrice *= 1.3;
        if (this.secondQuantity == "3 штуки") this.finalPrice *= 1.5;
      }
    },

    wellBotton: function() {
      //Днище
      if (checkBox[1].hasAttribute("checked") && this.doubleTank == false)
        this.finalPrice += 1000;
      if (checkBox[1].hasAttribute("checked") && this.doubleTank == true)
        this.finalPrice += 2000;
      checkBox[1].hasAttribute("checked")
        ? (this.tankBottom = true)
        : (this.tankBottom = false);
    },

    switcher: function(target) {
      switcher.forEach((item, index) => {
        if (item == target.closest(".onoffswitch-label")) {
          const checkItem = checkBox[index];
          checkItem.checked
            ? checkItem.removeAttribute("checked")
            : checkItem.setAttribute("checked", true);
          this.changeSwitcher();
          this.changeQuantity();
          this.wellBotton();
        }
      });
    },

    createObj: function() {
      newObj = JSON.parse(JSON.stringify(this));
      delete newObj.switcher;
      delete newObj.changeQuantity;
      delete newObj.changeSwitcher;
      delete newObj.createObj;
      delete newObj.events;
    },

    events: function(target) {
      secondOption.style.display = "none";
      this.switcher(target);
      if (target.classList.contains("form-control")) {
        this.changeSwitcher();
        this.changeQuantity();
        this.wellBotton();
      }

      if (target.classList.contains("construct-btn")) {
        this.createObj();
      }

      finalDistance.addEventListener("input", () => {
        this.distance = finalDistance.value;
      });

      // показывает итог
      finalValue.value = this.finalPrice;
    }
  };

  data.changeSwitcher();
  data.wellBotton();
  finalValue.value = data.finalPrice;
  accordion.addEventListener("click", event => data.events(event.target));
};

export { calc, newObj};
