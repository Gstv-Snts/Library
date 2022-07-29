const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
const form = document.querySelector("form");
let aberto = false;
let generosAberto = false;
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
home.addEventListener("click", () => {
  window.location.href = "/pages/index.html";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("../data/data.json")
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      localStorage.setItem("dados", JSON.stringify(body.data));
    });
  window.location.href = "/pages/index.html";
});
function abrirGenero() {
  const button = document.querySelector(".generosButton");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = button.innerHTML;
  fieldset.className = button.className;
  document.querySelector(".generos").replaceChild(fieldset, button);
  document.querySelector(".generosButtonLegend").style.display = "block";
  document.querySelector(".generosButton img").src =
    "http://localhost:5500/images/cadastrarGeneroFlechaCima.svg";
  document.querySelector(".generosOpicoes").style.display = "flex";
  generosAberto = true;
}

function fecharGenero() {
  const fieldset = document.querySelector(".generosButton");
  const button = document.createElement("button");
  button.innerHTML = fieldset.innerHTML;
  button.className = fieldset.className;
  document.querySelector(".generos").replaceChild(button, fieldset);
  document.querySelector(".generosButtonLegend").style.display = "none";
  document.querySelector(".generosButton img").src =
    "http://localhost:5500/images/cadastrarGeneroFlechaBaixo.svg";
  document.querySelector(".generosOpicoes").style.display = "none";
  generosAberto = false;
}

document.querySelector(".generos").addEventListener("click", () => {
  if (!generosAberto) {
    abrirGenero();
  } else {
    fecharGenero();
  }
});

document.querySelectorAll(".generosOpicoes button").forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".generosButton span").innerText = e.innerText;
  });
});

document.querySelector(".cancelar").addEventListener("click", () => {
  document.querySelector(".generosButton span").innerText = "Gênero";
});

document.querySelector(".cancelar").addEventListener("click", () => {
  window.location.href = "/pages/index.html";
});
