function emprestarLivro() {
    return `
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
    `
}