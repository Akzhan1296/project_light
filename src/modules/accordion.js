export default class Accordion {
    constructor(
      parent,
      nextBtn = false,
      btnClass
    ) {
      (this.parent = document.querySelector(parent)),
        (this.header = document.querySelectorAll(".panel-heading")),
        (this.body = document.querySelectorAll(".panel-collapse")),
        (this.targetClass = ".panel-heading"),
        (this.removeAddClass = "in"),
        (this.nextBtn = nextBtn);
      this.btnClass = btnClass;
    }

    accordionBuild(target) {
      this.header.forEach((item, index) => {
        if (item == target.closest(this.targetClass)) {
          this.body[index].classList.toggle(this.removeAddClass);

          for (let i = 0; i < this.body.length; i++) {
            if (i !== index) this.body[i].classList.remove(this.removeAddClass);
          }
        }
      });
    }

    nextStepBtn(target) {
      if (target && target.closest( this.btnClass)) {
        for (let i = 0; i < this.body.length - 1; i++) {
          if (this.body[i].classList.contains(this.removeAddClass)) {
            this.body[i].classList.remove(this.removeAddClass);
            this.body[i + 1].classList.add(this.removeAddClass);
            return;
          }
        }
      }
    }

    event() {
      this.header.forEach(item => (item.style.cssText = "cursor: pointer"));
      this.parent.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;
        this.accordionBuild(target);
        this.nextBtn == true ? this.nextStepBtn(target) : null;
      });
    }
  }