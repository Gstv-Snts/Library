const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const cadastrar = document.querySelector(".cadastrar");
const biblioteca = document.querySelector(".biblioteca");
const historico = document.querySelector(".historico");
let aberto = false;

fetch("../data/data.json")
  .then((res) => {
    return res.json();
  })
  .then((body) => {
    localStorage.setItem("dados", JSON.stringify(body.data));
  });

flecha.addEventListener("click", () => {
  if (!aberto) {
    sair.style.display = "block";
    aberto = true;
  } else {
    sair.style.display = "none";
    aberto = false;
  }
});
sair.addEventListener("click", () => {
  window.location.href = "../pages/login.html";
});
cadastrar.addEventListener("click", () => {
  window.location.href = "../pages/cadastrar.html";
});
biblioteca.addEventListener("click", () => {
  window.location.href = "../pages/biblioteca.html";
});
historico.addEventListener("click", () => {
  window.location.href = "../pages/login.html";
});
