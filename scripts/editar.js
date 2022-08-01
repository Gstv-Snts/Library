const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
const form = document.querySelector('form')
let aberto = false;
let generosAberto = false;
sair.addEventListener("click", () => {
    localStorage.removeItem("autenticado");
    window.location.href = "../pages/login.html";
});
home.addEventListener("click", () => {
    window.location.href = "/pages/index.html";
});

const livroEditar = JSON.parse(localStorage.getItem('livroParaEditar'))
let data = livroEditar.systemEntryDate
data = data.split("/").reverse().join("-");

document.querySelector('.livro-image').src = `.${livroEditar.image}`

document.querySelector('.titulo').value = livroEditar.tittle
document.querySelector('.autor').value = livroEditar.author
document.querySelector('.sinopse').value = livroEditar.synopsis
document.querySelector('.data').value = data;

function abrirGenero() {
    document.querySelector(".generosButton img").src =
        "http://localhost:5500/images/cadastrarGeneroFlechaCima.svg";
    document.querySelector(".generosOpicoes").style.display = "flex";
    generosAberto = true;
}

function fecharGenero() {
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

form.addEventListener('submit', (e) => {
    e.preventDefault()
})  