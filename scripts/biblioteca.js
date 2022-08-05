import { criarInfo, criarEmprestar, criarHistorico, criarInativar } from "./criarTelas.js";
const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
const main = document.querySelector('main')
let aberto = false;
let filtrosAberto = false;

const livros = JSON.parse(localStorage.getItem("livros"));

//preenche a tela
function preencherLivrosContainer() {
  document.querySelector('.livros-container').innerHTML = livros.map((e, i) => {
    let image
    if (e.image.charAt(0) === '.') {
      image = `.${e.image}`
    } else {
      image = e.image
    }
    return `
      <article id="${i}">
      <img src="${image}">
      <span>${e.tittle}</span>
      </article>
      `
  }).join('')
  document.querySelectorAll('article').forEach((e) => { e.addEventListener('click', articleClick) })
}

function janelaSair() {
  const main = document.querySelector('main')
  main.removeChild(main.lastElementChild)
}
function janelaSairEvent() {
  document.querySelector('.livro-informacao-sair').addEventListener('click', () => {
    janelaSair()
  })
}

function mostrarInfo(id) {
  main.appendChild(criarInfo(livros[id].image, livros[id].tittle, livros[id].synopsis, livros[id].author, livros[id].genre, livros[id].systemEntryDate, livros[id].rentHistory))
}
function mostrarEmprestar() {
  document.querySelector('.livro-informacao-esquerda button').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarEmprestar())
    janelaSairEvent()
  })
}
function mostrarHistorico(id) {
  document.querySelector('.livro-informacao-historico').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarHistorico(livros[id].rentHistory))
    janelaSairEvent()
  })
}
function mostrarInativar() {
  document.querySelector('.livro-informacao-inativar').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarInativar())
    janelaSairEvent()
  })
}

//abre info do livro no click
function articleClick(e) {
  const id = e.currentTarget.id
  mostrarInfo(id)
  janelaSairEvent()
  mostrarEmprestar()
  mostrarHistorico(id)
  mostrarInativar()

  document.querySelector('.livro-informacao-editar').addEventListener('click', () => {
    console.log(livros[id])
    localStorage.setItem('livroParaEditar', JSON.stringify(livros[id]))
    window.location.href = "../pages/editar.html"
  })
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
  console.log('genero')
  livros.sort((a, b) => {
    if (a.genre < b.genre) return -1;
    if (a.genre > b.genre) return 1;
  });
  preencherLivrosContainer()
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
