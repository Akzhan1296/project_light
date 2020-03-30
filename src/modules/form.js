const sendForm = (formTarget, json = {}) => {
  let statusMessages = {
    success: "Данные успешно отправлены",
    error: "Произошла ошибка, повторите позже",
    loading: " Загрузка..."
  };

  let div = document.createElement("div");
  div.style.cssText = `
    font-size: 2rem;
    color: rgb(242, 140, 7);
    text-align: center;
  `;

  div.textContent = statusMessages.loading;

  formTarget.appendChild(div);

  let formData = new FormData(formTarget);
  formData.forEach((value, key) => {
    json[key] = value;
  });

  let url = "server.php";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`error status ${response.status}`); //new Error => catch
      } else {
        div.textContent = statusMessages.success;
      }
    })
    .catch(error => {
      console.log(error);
      div.textContent = statusMessages.error;
    })
    .finally(() => {
      document.querySelectorAll("input").forEach(item => (item.value = ""));
      setTimeout(() => {
        formTarget.removeChild(div);
      }, 5000);
    });
};

export default sendForm;
