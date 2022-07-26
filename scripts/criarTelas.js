
export function criarDadosDoAluno(rentHistory) {
	return `
<div class="aluno-dados">
	<h1>Dados do aluno</h1>
	<div class="aluno-dados-container">
		<div>
			<h2>Nome do aluno</h2>
			<p>${rentHistory.studentName}</p>
		</div>
		<div>
			<h2>Turma</h2>
			<p>${rentHistory.class}</p>
		</div>
		<div>
			<h2>Data da retirada</h2>
			<p>${rentHistory.withdrawalDate}</p>
		</div>
		<div>
			<h2>Data da entrega</h2>
			<p>${rentHistory.deliveryDate}</p>
		</div>
	</div>
</div>
    `
}

export function criarInfo(livro) {
	console.log(livro)
	const livroInformacaoTela = document.createElement('div')
	livroInformacaoTela.className = 'livro-tela'
	const livroInformacaoConteudo = document.createElement('div')
	livroInformacaoConteudo.className = 'livro-informacao-conteudo'
	let img
	if (livro.image.charAt(0) === '.') {
		img = `.${livro.image}`
	} else {
		img = livro.image
	}
	const livroInformacao = `
<div class="livro-informacao">
	<img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
	<section class="livro-informacao-esquerda">
		<img src="${img}">
	</section>
	<section class="livro-informacao-direita">
		<h1>${livro.tittle}</h1>
		<h2>Sinopse</h2>
		<p>${livro.synopsis}</p>
		<h2>Autor</h2>
		<p>${livro.author}</p>
		<h2>Gênero</h2>
		<p>${livro.genre}</p>
		<h2>Data de entrada</h2>
		<p>${livro.systemEntryDate}</p>
		<div class="livro-informacao-direita-botoes">
			<button class="livro-informacao-editar">Editar</button>
			<button class="livro-informacao-historico">Histórico</button>
		</div>
	</section>
</div>
`
	livroInformacaoConteudo.insertAdjacentHTML('beforeend', livroInformacao)
	if (livro.rentHistory.length > 0) {
		livroInformacaoConteudo.insertAdjacentHTML('beforeend', criarDadosDoAluno(livro.rentHistory[livro.rentHistory.length - 1]))
	}
	livroInformacaoTela.appendChild(livroInformacaoConteudo)
	return livroInformacaoTela
}

export function criarHistorico() {
	const livroInformacaoTela = document.createElement('div')
	livroInformacaoTela.className = 'livro-tela'
	const historico = `
<div class="livro-historico">
	<img class="livro-informacao-sair" src="../images/sairBibliotecaInformacao.png">
	<h1>Histórico de empréstimos do livro</h1>
	<table>
	<tbody>
		<tr id="aluno">
		<th>Aluno</th>
			<td>
				<img class="livro-historico-icone" src="/images/historicoIcone.svg">
				<div class="livro-historico-icone-sublinhado"></div>
			</td>
		</tr>
		<tr id="turma">
		<th>Turma</th>
			<td>
				<img class="livro-historico-icone" src="/images/historicoIcone.svg">
				<div class="livro-historico-icone-sublinhado"></div>
			</td>
		</tr>
		<tr id="dataRetirada">
		<th>Data da Retirada</th>
			<td>
				<img class="livro-historico-icone" src="/images/historicoIcone.svg">
				<div class="livro-historico-icone-sublinhado"></div>
			</td>
		</tr>
		<tr id="dataEntrega">
		<th>Data da Entrega</th>
			<td>
				<img class="livro-historico-icone" src="/images/historicoIcone.svg">
				<div class="livro-historico-icone-sublinhado"></div>
			</td>
		</tr>
	</tbody>
	</table>
</div>
    `
	livroInformacaoTela.insertAdjacentHTML('beforeend', historico)
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
            <input class="nome" type="text" placeholder="Nome do Aluno">
            <input class="turma" type="text" placeholder="Turma">
            <input class="dataRetirada" type="date" onfocus="(this.type='date')" value="Data da retirada" />
            <input class="dataEntrega" type="date" onfocus="(this.type='date')" value="Data da Entrega"/>
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