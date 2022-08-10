const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p a");
let aberto = false;
sair.addEventListener("click", () => {
    localStorage.removeItem("autenticado");
    window.location.href = "../pages/login.html";
});
home.addEventListener("click", () => {
    window.location.href = "/pages/index.html";
});

const livros = JSON.parse(localStorage.getItem('livros'))
function limparTable() {
}

livros.forEach((d) => {
    d.rentHistory.forEach((e) => {
        document.getElementById('aluno').insertAdjacentHTML('beforeend', `<td>${e.studentName}</td>`)
        document.getElementById('turma').insertAdjacentHTML('beforeend', `<td>${e.class}</td>`)
        document.getElementById('livro').insertAdjacentHTML('beforeend', `<td>${d.tittle}</td>`)
        document.getElementById('dataRetirada').insertAdjacentHTML('beforeend', `<td>${e.withdrawalDate}</td>`)
        document.getElementById('dataEntrega').insertAdjacentHTML('beforeend', `<td>${e.deliveryDate}</td>`)
    })
})
