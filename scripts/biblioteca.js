const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
let aberto = false;
let filtrosAberto = false;

const livros = JSON.parse(localStorage.getItem("dados")).books;

function preencherLivrosContainer() {
  document.querySelector(".livros-container").innerHTML = livros
    .map((e) => {
      return `
  <article>
  <img src=".${e.image}">
  <span>${e.tittle}</span>
  </article>
  `;
    })
    .join("");
}

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

function abrirFiltro() {
  const button = document.querySelector(".filtrarButton");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = button.innerHTML;
  fieldset.className = button.className;
  document.querySelector(".filtrar").replaceChild(fieldset, button);
  document.querySelector(".filtrarButtonLegend").style.display = "block";
  document.querySelector(".filtrarButton img").src =
    "http://localhost:5500/images/cadastrarGeneroFlechaCima.svg";
  document.querySelector(".filtrarOpicoes").style.display = "flex";
  filtrosAberto = true;
}

function fecharFiltro() {
  const fieldset = document.querySelector(".filtrarButton");
  const button = document.createElement("button");
  button.innerHTML = fieldset.innerHTML;
  button.className = fieldset.className;
  document.querySelector(".filtrar").replaceChild(button, fieldset);
  document.querySelector(".filtrarButtonLegend").style.display = "none";
  document.querySelector(".filtrarButton img").src =
    "http://localhost:5500/images/cadastrarGeneroFlechaBaixo.svg";
  document.querySelector(".filtrarOpicoes").style.display = "none";
  filtrosAberto = false;
}

document.querySelector(".filtrar").addEventListener("click", () => {
  if (!filtrosAberto) {
    abrirFiltro();
  } else {
    fecharFiltro();
  }
});

document.querySelectorAll(".filtrarOpicoes button").forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".filtrarButton span").innerText = e.innerText;
  });
});

preencherLivrosContainer();

document.querySelector(".filtroGenero").addEventListener("click", (e) => {
  livros.sort((a, b) => {
    if (a.genre < b.genre) return -1;
    if (a.genre > b.genre) return 1;
  });
  preencherLivrosContainer();
});
document.querySelector(".filtroAutor").addEventListener("click", (e) => {
  livros.sort((a, b) => {
    if (a.author < b.author) return -1;
    if (a.author > b.author) return 1;
  });
  preencherLivrosContainer();
});
document.querySelector(".filtroData").addEventListener("click", (e) => {
  livros.sort((a, b) => {
    if (a.systemEntryDate < b.systemEntryDate) return -1;
    if (a.systemEntryDate > b.systemEntryDate) return 1;
  });
  preencherLivrosContainer();
});
