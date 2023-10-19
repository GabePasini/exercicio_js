const form = document.getElementById('form-contato');
const nomeContato = document.getElementById('nome-completo');
const telContato = document.getElementById('numero-telefone');
const emailContato = document.getElementById('e-mail');
const submitButton = document.getElementById('submit-button');
const nome = [];
const telefone = [];
const email = [];

telContato.addEventListener('input', function (event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const formattedValue = formatPhoneNumber(value);
    input.value = formattedValue;
});

function formatPhoneNumber(value) {
    if (value.length <= 2) {
        return `(${value}`;
    } else if (value.length <= 7) {
        return `(${value.slice(0, 2)})${value.slice(2)}`;
    } else {
        return `(${value.slice(0, 2)})${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
}

function isValidFullName(fullName) {
    const words = fullName.split(' ');
    return words.length >= 2;
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

submitButton.addEventListener('click', function() {
    if (!isValidFullName(nomeContato.value)) {
        alert('Por favor, insira um nome completo válido.');
    } else {
        adicionaLinha();
        atualizaQuantidadeContatos();
        atualizaTabela();
        ordenarTabela();
    }
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
