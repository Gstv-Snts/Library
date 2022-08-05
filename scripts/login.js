const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("../data/data.json")
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      console.log(body.data.login);
      localStorage.setItem("logins", JSON.stringify(body.data.login));
    });

  const logins = JSON.parse(localStorage.getItem("logins"));
  const email = document.querySelector(".email");
  const password = document.querySelector(".password");
  localStorage.clear();
  logins.map((e) => {
    if (e.email === email.value && e.password === password.value) {
      localStorage.setItem("autenticado", true);
      fetch("../data/data.json")
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          localStorage.setItem("livros", JSON.stringify(body.data.books));
        });
      window.location.href = "../pages/index.html";
    }
  });
});
