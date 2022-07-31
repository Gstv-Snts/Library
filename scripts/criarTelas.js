
export function criarDadosDoAluno(nome, turma, dataRetirada, dataEntrega) {
    return `
<div class="aluno-dados">
	<h1>Dados do aluno</h1>
	<div class="aluno-dados-container">
		<div>
			<h2>Nome do aluno</h2>
			<p>${nome}</p>
		</div>
		<div>
			<h2>Turma</h2>
			<p>${turma}</p>
		</div>
		<div>
			<h2>Data da retirada</h2>
			<p>${dataRetirada}</p>
		</div>
		<div>
			<h2>Data da entrega</h2>
			<p>${dataEntrega}</p>
		</div>
	</div>
</div>
    `
}

export function criarInfo(image, tittle, synopsis, author, genre, systemEntryDate, rentHistory) {
    const livroInformacaoTela = document.createElement('div')
    livroInformacaoTela.className = 'livro-tela'
    const livroInformacao = `
<div class="livro-informacao">
	<img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
	<section class="livro-informacao-esquerda">
		<img src=".${image}">
		<button><img src="../images/emprestarLivro.svg"> Emprestar</button>
	</section>
	<section class="livro-informacao-direita">
		<h1>${tittle}</h1>
		<h2>Sinopse</h2>
		<p>${synopsis}</p>
		<h2>Autor</h2>
		<p>${author}</p>
		<h2>Gênero</h2>
		<p>${genre}</p>
		<h2>Data de entrada</h2>
		<p>${systemEntryDate}</p>
		<div class="livro-informacao-direita-botoes">
			<button class="livro-informacao-editar">Editar</button>
			<button class="livro-informacao-inativar">Inativar</button>
			<button class="livro-informacao-historico">Histórico</button>
		</div>
	</section>
</div>
`
    livroInformacaoTela.insertAdjacentHTML('beforeend', livroInformacao)
    livroInformacaoTela.insertAdjacentHTML('beforeend', criarDadosDoAluno())
    return livroInformacaoTela
}

export function criarHistorico(rentHistory) {
    const livroInformacaoTela = document.createElement('div')
    livroInformacaoTela.className = 'livro-tela'
    const historico = `
<div class="livro-historico">
	<img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
	<h1>Histórico de empréstimos do livro</h1>
	<table>
		<thead>
			<th>Aluno</th>
			<th>Turma</th>
			<th>Data da retirada</th>
			<th>Data da Entrega</th>
		</thead>
		<tbody>
			<tr>
				<td>
					<img class="livro-historico-icone" src="/images/historicoIcone.svg">
					<div class="livro-historico-icone-sublinhado"></div>
				</td>
				<td>
					<img src="/images/historicoIcone.svg">
					<div class="livro-historico-icone-sublinhado"></div>
				</td>
				<td>
					<img src="/images/historicoIcone.svg">
					<div class="livro-historico-icone-sublinhado"></div>
				</td>
				<td>
					<img src="/images/historicoIcone.svg">
					<div class="livro-historico-icone-sublinhado"></div>
				</td>
			</tr>
		</tbody>
	</table>
</div>
    `
    livroInformacaoTela.insertAdjacentHTML('beforeend', historico)
    rentHistory.forEach((e) => {
        const historico = `
        <tr>
        <td>${e.studentName}</td>
        <td>${e.class}</td>
        <td>${e.withdrawalDate}</td>
        <td>${e.deliveryDate}</td>
        </tr>
        `
        console.log(e)
        console.log(livroInformacaoTela.childNodes[1].childNodes[5].childNodes[3])
        livroInformacaoTela.childNodes[1].childNodes[5].childNodes[3].insertAdjacentHTML('beforeend', historico)
    })

    return livroInformacaoTela
}

export function criarEmprestar() {
    const livroInformacaoTela = document.createElement('div')
    livroInformacaoTela.className = 'livro-tela'
    const emprestarLivro = `
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
    livroInformacaoTela.insertAdjacentHTML('beforeend', emprestarLivro)
    return livroInformacaoTela
}

export function criarInativar() {
    const livroInformacaoTela = document.createElement('div')
    livroInformacaoTela.className = 'livro-tela'

    const inativar = `
    <div class="inativar-livro">
    <img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
    <h1>Inativar Livro</h1>
    <textarea placeholder="Descrição"></textarea>
    <button>Inativar</button>
    </div>
    `

    livroInformacaoTela.insertAdjacentHTML('beforeend', inativar)

    return livroInformacaoTela
}