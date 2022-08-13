function abrirGenero() {
  const button = document.querySelector(".generosButton");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = button.innerHTML;
  fieldset.className = button.className;
  document.querySelector(".generos").replaceChild(fieldset, button);
  document.querySelector(".generosButtonLegend").style.display = "block";
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

function criarImage() {
  const fr = new FileReader();
  fr.onload = () => {
    return fr.result
  }
  fr.readAsDataURL(document.querySelector('.img').files[0])
}

const flecha = document.querySelector(".flecha");
const sair = document.querySelector(".sair");
const home = document.querySelector("main p a");
const form = document.querySelector("form");
let aberto = false;
let generosAberto = false;
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
  localStorage.removeItem('autenticado')
  window.location.href = "../pages/login.html";
});
home.addEventListener("click", () => {
  window.location.href = "/pages/index.html";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const genre = document.querySelector('.generosButton span').innerText
  if (genre === 'Selecione' || genre === 'Gênero') {
    alert('Selecione algum genero')
  } else {

    const tittle = document.querySelector('.titulo').value
    const author = document.querySelector('.autor').value
    const synopsis = document.querySelector('.sinopse').value
    let data = document.querySelector('.data').value
    data = data.split("-").reverse().join("-");
    data = data.replaceAll('-', '/')
    const novoLivro = {
      tittle: tittle,
      author: author,
      genre: genre,
      status: {
        isActive: true,
        description: ""
      },
      image: "",
      systemEntryDate: data,
      synopsis: synopsis,
      rentHistory: []
    }
    const fr = new FileReader();
    fr.onload = () => {
      console.log(fr.result)
      novoLivro.image = fr.result
      let livros = JSON.parse(localStorage.getItem('livros'))
      livros.push(novoLivro)
      localStorage.setItem('livros', JSON.stringify(livros))
      console.log(JSON.parse(localStorage.getItem('livros')))
    }
    fr.readAsDataURL(document.querySelector('.img').files[0])
    window.location.href = '/pages/biblioteca.html'
  }
});



document.querySelector('.img').addEventListener('change', (e) => {
  const fr = new FileReader();
  fr.onload = () => {
    document.querySelector('form label').innerHTML = `
    <img src="${fr.result}">
    `
  }
  fr.readAsDataURL(document.querySelector('.img').files[0])
})

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

document.querySelector(".cancelar").addEventListener("click", () => {
  window.location.href = "/pages/index.html";
});

document.querySelector('.titulo-container').addEventListener('click', (e) => {
  const div = document.querySelector(".titulo-container");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = div.innerHTML;
  fieldset.insertAdjacentHTML('beforeend', `<legend>Título</legend>`)
  fieldset.className = div.className;
  document.querySelector("form").replaceChild(fieldset, div);
  document.querySelector('.titulo').focus()
})
document.querySelector('.autor').addEventListener('focus', (e) => {
  const div = document.querySelector(".autor-container");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = div.innerHTML;
  fieldset.insertAdjacentHTML('beforeend', `<legend>Autor</legend>`)
  fieldset.className = div.className;
  document.querySelector("form").replaceChild(fieldset, div);
  document.querySelector('.autor').focus()
})
document.querySelector('.sinopse').addEventListener('focus', (e) => {
  const div = document.querySelector(".sinopse-container");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = div.innerHTML;
  fieldset.insertAdjacentHTML('beforeend', `<legend>Sínopse</legend>`)
  fieldset.className = div.className;
  document.querySelector("form").replaceChild(fieldset, div);
  document.querySelector('.sinopse').focus()
})
document.querySelector('.data').addEventListener('focus', (e) => {
  const div = document.querySelector(".data-container");
  const fieldset = document.createElement("fieldset");
  fieldset.innerHTML = div.innerHTML;
  fieldset.insertAdjacentHTML('beforeend', `<legend>Data</legend>`)
  fieldset.className = div.className;
  document.querySelector("form").replaceChild(fieldset, div);
  document.querySelector('.data').focus()
})