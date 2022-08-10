import { criarInfo, criarEmprestar, criarHistorico, criarInativar } from "./criarTelas.js";
const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p a");
const main = document.querySelector('main')
let aberto = false;
let filtrosAberto = false;

const livros = JSON.parse(localStorage.getItem("livros"));

//preenche a tela
function preencherLivrosContainer() {
  document.querySelector('.livros-container').innerHTML = livros.map((e, i) => {
    let image
    if (e.image.charAt(0) === '.') {
      image = `.${e.image}`
    } else {
      image = e.image
    }
    return `
      <article id="${i}">
      <img src="${image}">
      <span>${e.tittle}</span>
      </article>
      `
  }).join('')
  document.querySelectorAll('article').forEach((e) => { e.addEventListener('click', articleClick) })
}

function janelaSair() {
  const main = document.querySelector('main')
  main.removeChild(main.lastElementChild)
}
function janelaSairEvent() {
  document.querySelector('.livro-informacao-sair').addEventListener('click', () => {
    janelaSair()
  })
}

function mostrarInfo(id) {
  main.appendChild(criarInfo(livros[id]))
  if (!livros[id].status.isActive && livros[id].status.description != 'emprestado') {
    if (document.querySelector('.aluno-dados')) {
      document.querySelector('.aluno-dados').innerHTML = `
      <h1>Informações da inativação</h1>
      <div class="aluno-dados-container">
      <div>
      <h2>Motivo</h2>
      <p>${livros[id].status.description}</p>
      </div>
      </div>
    `
    } else {
      document.querySelector('.livro-tela').insertAdjacentHTML('beforeend', `
      <div class="aluno-dados">
      <h1>Informações da inativação</h1>
      <div class="aluno-dados-container">
      <div>
      <h2>Motivo</h2>
      <p>${livros[id].status.description}</p>
      </div>
      </div>
      </div>
      `)
    }
    document.querySelector('.livro-informacao-esquerda').insertAdjacentHTML('beforeend', `<button class="emprestar-button desativado"><img src="../images/emprestarLivro.svg"> Emprestar</button>`)
    document.querySelector('.livro-informacao-editar').insertAdjacentHTML('afterend', `<button class="livro-informacao-ativar">Ativar</button>`)
    ativarLivro(id)
  } else if (!livros[id].status.isActive && livros[id].status.description === 'emprestado') {
    document.querySelector('.livro-informacao-esquerda').insertAdjacentHTML('beforeend', `<button class="devolver-button"><img src="../images/emprestarLivro.svg">Devolver</button>`)
    document.querySelector('.livro-informacao-editar').insertAdjacentHTML('afterend', `<button class="livro-informacao-inativar">Inativar</button>`)
    document.querySelector('.devolver-button').addEventListener('click', () => {
      livros[id].status.isActive = true
      livros[id].status.description = ''
      localStorage.setItem('livros', JSON.stringify(livros))
      window.location.href = '/pages/biblioteca.html'
    })
    mostrarInativar(id)
  } else {
    if (document.querySelector('.aluno-dados')) {
      document.querySelector('.livro-informacao-conteudo').removeChild(document.querySelector('.aluno-dados'))
    }
    document.querySelector('.livro-informacao-esquerda').insertAdjacentHTML('beforeend', `<button class="emprestar-button"><img src="../images/emprestarLivro.svg">Emprestar</button>`)
    document.querySelector('.livro-informacao-editar').insertAdjacentHTML('afterend', `<button class="livro-informacao-inativar">Inativar</button>`)
    mostrarInativar(id)
    mostrarEmprestar(id)
  }
}
function mostrarEmprestar(id) {
  document.querySelector('.livro-informacao-esquerda button').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarEmprestar())
    janelaSairEvent()
    document.querySelector('.emprestar-livro button').addEventListener('click', () => {
      const nome = document.querySelector('.nome').value
      const turma = document.querySelector('.turma').value
      let dataRetirada = document.querySelector('.dataRetirada').value
      dataRetirada = dataRetirada.split("-").reverse().join("-");
      dataRetirada = dataRetirada.replaceAll('-', '/')
      let dataEntrega = document.querySelector('.dataEntrega').value
      dataEntrega = dataEntrega.split("-").reverse().join("-");
      dataEntrega = dataEntrega.replaceAll('-', '/')
      const novoEmprestimo = { studentName: nome, class: turma, deliveryDate: dataEntrega, withdrawalDate: dataRetirada, }
      livros[id].rentHistory.push(novoEmprestimo)
      livros[id].status.isActive = false
      livros[id].status.description = 'emprestado'
      localStorage.setItem('livros', JSON.stringify(livros))
      window.location.href = '/pages/biblioteca.html'
    })
  })
}
function mostrarHistorico(id) {
  document.querySelector('.livro-informacao-historico').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarHistorico())
    livros[id].rentHistory.forEach((e, i) => {
      document.getElementById('aluno').insertAdjacentHTML('beforeend', `<td>${e.studentName}</td>`)
      document.getElementById('turma').insertAdjacentHTML('beforeend', `<td>${e.class}</td>`)
      document.getElementById('dataRetirada').insertAdjacentHTML('beforeend', `<td>${e.withdrawalDate}</td>`)
      document.getElementById('dataEntrega').insertAdjacentHTML('beforeend', `<td>${e.deliveryDate}</td>`)
    })
    janelaSairEvent()
  })
}
function mostrarInativar(id) {
  document.querySelector('.livro-informacao-inativar').addEventListener('click', () => {
    janelaSair()
    main.appendChild(criarInativar())
    janelaSairEvent()
    document.querySelector('.inativar-livro button').addEventListener('click', () => {
      livros[id].status.isActive = false
      livros[id].status.description = document.querySelector('.inativar-livro textarea').value
      localStorage.setItem('livros', JSON.stringify(livros))
      window.location.href = '/pages/biblioteca.html'
    })
  })
}
function ativarLivro(id) {
  document.querySelector('.livro-informacao-ativar').addEventListener('click', () => {
    livros[id].status.isActive = true
    livros[id].status.description = ''
    localStorage.setItem('livros', JSON.stringify(livros))
    window.location.href = '/pages/biblioteca.html'
  })
}

//abre info do livro no click
function articleClick(e) {
  const id = e.currentTarget.id
  mostrarInfo(id)
  janelaSairEvent()
  mostrarHistorico(id)
  document.querySelector('.livro-informacao-editar').addEventListener('click', () => {
    localStorage.setItem('livroParaEditar', JSON.stringify(livros[id]))
    window.location.href = "../pages/editar.html"
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
  preencherLivrosContainer()
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
