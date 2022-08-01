const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p");
let aberto = false;
sair.addEventListener("click", () => {
    localStorage.removeItem("autenticado");
    window.location.href = "../pages/login.html";
});
home.addEventListener("click", () => {
    window.location.href = "/pages/index.html";
});

const livros = JSON.parse(localStorage.getItem('livros'))

livros.forEach((d) => {
    d.rentHistory.forEach((e) => {
        console.log(d)
        const historico = `
        <tr>
            <td>${e.studentName}</td>
            <td>${e.class}</td>
            <td>${d.tittle}</td>
            <td>${e.withdrawalDate}</td>
            <td>${e.deliveryDate}</td>
        </tr>
        `
        document.querySelector('tbody').insertAdjacentHTML('beforeend', historico)
    })
})