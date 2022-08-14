const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p a");
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
    localStorage.removeItem("autenticado");
    window.location.href = "../pages/login.html";
});
home.addEventListener("click", () => {
    window.location.href = "/pages/index.html";
});

const livros = JSON.parse(localStorage.getItem('livros'))

const historicos = []
livros.forEach((d) => {
    d.rentHistory.forEach((e) => {
        historicos.push({ name: e.studentName, class: e.class, tittle: d.tittle, withdrawl: e.withdrawalDate, delivery: e.deliveryDate })
    })
})

function limparTable() {
    for (let i = 0; document.querySelector('#aluno').childNodes.length > 4; i++) {
        document.querySelector('#aluno').removeChild(document.querySelector('#aluno').childNodes[4])
    }
    for (let i = 0; document.querySelector('#turma').childNodes.length > 4; i++) {
        document.querySelector('#turma').removeChild(document.querySelector('#turma').childNodes[4])
    }
    for (let i = 0; document.querySelector('#livro').childNodes.length > 4; i++) {
        document.querySelector('#livro').removeChild(document.querySelector('#livro').childNodes[4])
    }
    for (let i = 0; document.querySelector('#dataRetirada').childNodes.length > 4; i++) {
        document.querySelector('#dataRetirada').removeChild(document.querySelector('#dataRetirada').childNodes[4])
    }
    for (let i = 0; document.querySelector('#dataEntrega').childNodes.length > 4; i++) {
        document.querySelector('#dataEntrega').removeChild(document.querySelector('#dataEntrega').childNodes[4])
    }
}

function preencherTable() {


    historicos.forEach((e) => {
        document.getElementById('aluno').insertAdjacentHTML('beforeend', `<td>${e.name}</td>`)
        document.getElementById('turma').insertAdjacentHTML('beforeend', `<td>${e.class}</td>`)
        document.getElementById('livro').insertAdjacentHTML('beforeend', `<td>${e.tittle}</td>`)
        document.getElementById('dataRetirada').insertAdjacentHTML('beforeend', `<td>${e.withdrawl}</td>`)
        document.getElementById('dataEntrega').insertAdjacentHTML('beforeend', `<td>${e.delivery}</td>`)
    })
}

preencherTable()

document.querySelector('#aluno').addEventListener('click', () => {
    historicos.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
    });
    limparTable()
    preencherTable()
})
document.querySelector('#turma').addEventListener('click', () => {
    historicos.sort((a, b) => {
        if (a.class < b.class) return -1;
        if (a.class > b.class) return 1;
    });
    limparTable()
    preencherTable()
})
document.querySelector('#livro').addEventListener('click', () => {
    historicos.sort((a, b) => {
        if (a.tittle < b.tittle) return -1;
        if (a.tittle > b.tittle) return 1;
    });
    limparTable()
    preencherTable()
})
document.querySelector('#dataRetirada').addEventListener('click', () => {
    historicos.sort((a, b) => {
        if (a.withdrawl < b.withdrawl) return -1;
        if (a.withdrawl > b.withdrawl) return 1;
    });
    limparTable()
    preencherTable()
})
document.querySelector('#dataEntrega').addEventListener('click', () => {
    historicos.sort((a, b) => {
        if (a.delivery < b.delivery) return -1;
        if (a.delivery > b.delivery) return 1;
    });
    limparTable()
    preencherTable()
})