const form = document.getElementById('form-contato');
const nomeContato = document.getElementById('nome-completo');
const telContato = document.getElementById('numero-telefone');
const emailContato = document.getElementById('e-mail');
const nome = [];
const telefone = [];
const email = [];

form.addEventListener('submit', function (event) {
    if (!isValidFullName(nomeContato.value)) {
        alert('Por favor, insira um nome completo válido.');
        event.preventDefault();
    }
    if (!isValidPhone(telContato.value)) {
        alert('Por favor, insira um número de telefone válido.');
        event.preventDefault();
    }
});

function isValidFullName(fullName) {
    const words = fullName.split(' ');
    return words.length >= 2;
}

function isValidPhone(phoneNumber) {
    const phonePattern = /^\d+$/;
    
    return phonePattern.test(phoneNumber);
}

telContato.addEventListener('keyup', function (e) {
    console.log(e.target.value)
    const phoneNumber = telContato.value;
    
    if (!isValidPhone(phoneNumber)) {
        telContato.setCustomValidity('Por favor, insira apenas dígitos no número de telefone.');
    } else {
        telContato.setCustomValidity('');
    }
});

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaQuantidadeContatos(); 
    atualizaTabela();
    ordenarTabela();
});

function adicionaLinha() {
    const inputNomeCompleto = document.getElementById('nome-completo');
    const inputNumeroTelefone = document.getElementById('numero-telefone');
    const inputEmailContato = document.getElementById('e-mail')

    const nomeCompleto = inputNomeCompleto.value;
    const palavras = nomeCompleto.split(' ');
    const iniciais = palavras.map(palavra => palavra[0]).join('').toUpperCase();

    nome.push(inputNomeCompleto.value);
    telefone.push(inputNumeroTelefone.value);
    email.push(inputEmailContato.value);

    let linha = '<tr id="linha-' + (nome.length - 1) + '">';
    linha += `<td id="iniciais">${iniciais}</td>`;
    linha += `<td>${inputNomeCompleto.value}</td>`;
    linha += `<td>${inputNumeroTelefone.value}</td>`;
    linha += `<td>${inputEmailContato.value}</td>`;
    linha += `</tr>`

    linhas += linha;

    inputNomeCompleto.value = '';
    inputNumeroTelefone.value = '';
    inputEmailContato.value = '';
}

function ordenarTabela() {
    const tbody = document.querySelector('tbody');
    const linhas = [...tbody.rows];

    linhas.sort((a, b) => {
        const nomeA = a.cells[0].textContent.toLowerCase();
        const nomeB = b.cells[0].textContent.toLowerCase();
        return nomeA.localeCompare(nomeB);
    });

    tbody.innerHTML = '';

    linhas.forEach((linha) => {
        tbody.appendChild(linha);
    });
}

function atualizaQuantidadeContatos() {
    const quantidadeContatos = nome.length;
    document.getElementById('tfoot-qtd').textContent = quantidadeContatos;
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}
