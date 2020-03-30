const sent = (formTarget, json = {}) => {
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
        console.log("Data was created and successfully sent");
      }
    })
    .catch(error => {
      alert(error);
    })
    .finally(() => {
      formTarget.querySelectorAll("input").forEach(item => (item.value = ""));
    });
};

let test = {
  a: 123
};

document.body.addEventListener("submit", e => {
  e.preventDefault();
  console.log(e.target)
  sent(e.target, test);
});
