const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let dados = []
  fetch("../data/data.json")
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      body.data.login.forEach((e) => {
        dados.push(e)
      })
    }).then(() => {
      const email = document.querySelector(".email");
      const password = document.querySelector(".password");
      dados.forEach((d) => {
        if (d.email === email.value && d.password === password.value) {
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
      })
    }
    )
}
);
