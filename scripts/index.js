const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const cadastrar = document.querySelector(".cadastrar");
const biblioteca = document.querySelector(".biblioteca");
const historico = document.querySelector(".historico");
let aberto = false;
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
  window.location.href = "../pages/login.html";
});
biblioteca.addEventListener("click", () => {
  window.location.href = "../pages/login.html";
});
historico.addEventListener("click", () => {
  window.location.href = "../pages/login.html";
});
