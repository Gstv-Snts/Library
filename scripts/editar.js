const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p a");
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
let image
if (livroEditar.image.charAt(0) === '.') {
    image = `.${livroEditar.image}`
} else {
    image = livroEditar.image
}
document.querySelector('.livro-image').src = image
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

document.querySelectorAll(".generosOpicoes a").forEach((e) => {
    e.addEventListener("click", () => {
        document.querySelector(".generosButton span").innerText = e.innerText;
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const livros = JSON.parse(localStorage.getItem('livros'))
    livros.forEach((e) => {
        if (e.tittle === livroEditar.tittle && e.author === livroEditar.author) {
            if (document.querySelector('.generosButton span').innerText === "Gênero") {
                alert('SELECIONE O NOVO GENERO!')
            } else {

                e.tittle = document.querySelector('.titulo').value
                e.author = document.querySelector('.autor').value
                e.synopsis = document.querySelector('.sinopse').value
                e.genre = document.querySelector('.generosButton span').innerText
                let data = document.querySelector('.data').value
                data = data.split("-").reverse().join("-");
                data = data.replaceAll('-', '/')
                e.systemEntryDate = data
                localStorage.removeItem('livroParaEditar')
                window.location.href = '/pages/biblioteca.html'
            }
        }
    })
    localStorage.setItem('livros', JSON.stringify(livros))
})  