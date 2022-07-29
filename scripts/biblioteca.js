const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
let aberto = false;
let filtrosAberto = false;

fetch("../data/data.json")
  .then((res) => {
    return res.json();
  })
  .then((body) => {
    localStorage.setItem("livros", JSON.stringify(body.data.books));
  });

const livros = JSON.parse(localStorage.getItem("livros"));
console.log(livros);

function preencherLivrosContainer() {
  document.querySelector(".livros-container").innerHTML = livros
    .map((e, i) => {
      return `
        <article>
          <img src=".${e.image}">
          <span>${e.tittle}</span>
        </article>
        <div class="livro-informacao">
          <section class="livro-informacao-esquerda">
            <img src=".${e.image}">
            <button><img src="../images/emprestarLivro.svg"> Emprestar</button>
          </section>
          <section class="livro-informacao-direita">
            <h1>${e.tittle}</h1>
            <h2>Sinopse</h2>
            <p>${e.synopsis}</p>
            <h2>Autor</h2>
            <p>${e.author}</p>
            <h2>Gênero</h2>
            <p>${e.genre}</p>
            <h2>Data de entrada</h2>
            <p>${e.systemEntryDate}</p>
          </section>
        </div>
  `;
    })
    .join("");

  document.querySelectorAll('article').forEach((e) => {
    e.addEventListener('click', (e) => {
      console.log(
        e.currentTarget.nextElementSibling)
      e.currentTarget.nextElementSibling.style.display = 'flex'
    })
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
