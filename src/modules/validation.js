const validation = () => {
  const onlyNumbers = document.querySelectorAll('input[type="tel"]'),
    onlyRussionLetters = document.querySelectorAll('input[type="text"]');

  //Russion Letters
  onlyRussionLetters.forEach(item => [
    item.addEventListener("input", function() {
      this.value = this.value.replace(/[^А-Яа-яЁё ]/, "");
    })
  ]);

  //numbers
  const setCursorPosition = (pos, elem) => {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  };
  const mask = event => {
    let target = event.target;

    let matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = target.value.replace(/\D/g, "");

    if (def.length >= val.length) {
      val = def;
    }
    target.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    if (event.type === "blur") {
      if (target.value.length === 2) {
        target.value = "";
      }
    } else {
      setCursorPosition(target.value.length, target);
    }
  };

  onlyNumbers.forEach(elem => {
    if (elem.getAttribute("name") === "user_phone") {
      elem.addEventListener("input", mask);
    }
  });


};

export default validation;
