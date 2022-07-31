document.querySelector(".livros-container").innerHTML = livros
  .map((e, i) => {
    return `
        <article>
          <img src=".${e.image}">
          <span>${e.tittle}</span>
        </article>

        <div class="livro-informacao-tela">

          </div>
          <div class="emprestar-livro">
            <img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
            <h2>Informe os dados do aluno antes de continuar</h2>
            <div class="emprestar-livro-inputs">
            <input type="text" placeholder="Nome do Aluno">
            <input type="text" placeholder="Turma">
            <input class="data" type="date" onfocus="(this.type='date')" value="Data da retirada" />
            <input class="data" type="date" onfocus="(this.type='date')" value="Data da Entrega"/>
            </div>
            <button><img src="../images/emprestarLivro.svg"> Emprestar</button>
          </div>
       </div>

  `;
  })
  .join("");

document.querySelectorAll('article').forEach((e) => {
  e.addEventListener('click', (e) => {
    e.currentTarget.nextElementSibling.style.display = 'flex'
  })
})
document.querySelectorAll('.livro-informacao .livro-informacao-sair').forEach((e) => {
  e.addEventListener('click', (e) => {
    e.currentTarget.parentNode.parentNode.style.display = 'none'
  })
})
document.querySelectorAll('.emprestar-livro .livro-informacao-sair').forEach((e) => {
  e.addEventListener('click', (e) => {
    e.currentTarget.parentNode.style.display = 'none'
    e.currentTarget.parentNode.parentNode.childNodes[1].style.display = 'flex'
  })
})
document.querySelector('.livro-informacao-esquerda button').addEventListener('click', (e) => {
  console.log(e.currentTarget.parentNode.parentNode)
  console.log(e.currentTarget.parentNode.parentNode.parentNode.childNodes[3])
  e.currentTarget.parentNode.parentNode.style.display = 'none';
  e.currentTarget.parentNode.parentNode.parentNode.childNodes[3].style.display = 'flex'
})