// Seleciona o elemento onde o texto vai aparecer
const elementoTexto = document.querySelector('.hero-role');
const textosParaDigitar = ["Desenvolvedor Front-End Junior", "Web Developer", "Estudante de ADS"];
let indexTexto = 0;
let indexLetra = 0;

function digitar() {
    if (indexLetra < textosParaDigitar[indexTexto].length) {
        elementoTexto.innerHTML = textosParaDigitar[indexTexto].substring(0, indexLetra + 1) + '<span class="cursor">|</span>';
        indexLetra++;
        setTimeout(digitar, 100); // Velocidade da digitação (em milissegundos)
    } else {
        setTimeout(apagar, 2000); // Tempo que o texto fica visível antes de apagar
    }
}

function apagar() {
    if (indexLetra > 0) {
        elementoTexto.innerHTML = textosParaDigitar[indexTexto].substring(0, indexLetra - 1) + '<span class="cursor">|</span>';
        indexLetra--;
        setTimeout(apagar, 50); // Velocidade ao apagar
    } else {
        indexTexto = (indexTexto + 1) % textosParaDigitar.length; // Passa para o próximo texto
        setTimeout(digitar, 500);
    }
}

// Inicia o efeito assim que a página carrega
document.addEventListener("DOMContentLoaded", digitar);

const campoTexto = document.getElementById('detalhes');
const contador = document.getElementById('contador');
const limiteMaximo = 300;

campoTexto.addEventListener('input', function() {
    const caracteresRestantes = limiteMaximo - campoTexto.value.length;
    contador.textContent = `${caracteresRestantes} caracteres restantes`;

    if (caracteresRestantes < 50) {
        contador.style.color = "var(--cor-laranja)"; // Alerta que está acabando o espaço
    } else {
        contador.style.color = "var(--texto-mutado)";
    }
});
const btnMenu = document.getElementById('btn-menu');
const menuNav = document.querySelector('.navbar nav');

btnMenu.addEventListener('click', function() {
    menuNav.classList.toggle('ativo'); // Liga e desliga a classe "ativo" no HTML
});

// ================= 1. EFEITO DIGITAÇÃO (TYPEWRITER) =================
const elementoTexto = document.querySelector('.hero-role');
const textosParaDigitar = ["Desenvolvedor Front-End Junior", "Web Developer", "Estudante de ADS"];
let indexTexto = 0;
let indexLetra = 0;

function digitar() {
    if (indexLetra < textosParaDigitar[indexTexto].length) {
        elementoTexto.innerHTML = textosParaDigitar[indexTexto].substring(0, indexLetra + 1) + '<span class="cursor">|</span>';
        indexLetra++;
        setTimeout(digitar, 100);
    } else {
        setTimeout(apagar, 2000);
    }
}

function apagar() {
    if (indexLetra > 0) {
        elementoTexto.innerHTML = textosParaDigitar[indexTexto].substring(0, indexLetra - 1) + '<span class="cursor">|</span>';
        indexLetra--;
        setTimeout(apagar, 50);
    } else {
        indexTexto = (indexTexto + 1) % textosParaDigitar.length;
        setTimeout(digitar, 500);
    }
}

document.addEventListener("DOMContentLoaded", digitar);


// ================= 2. CONTADOR DE CARACTERES =================
const campoTexto = document.getElementById('detalhes');
const contador = document.getElementById('contador');
const limiteMaximo = 300;

campoTexto.addEventListener('input', function() {
    const caracteresRestantes = limiteMaximo - campoTexto.value.length;
    contador.textContent = `${caracteresRestantes} caracteres restantes`;

    if (caracteresRestantes < 50) {
        contador.style.color = "var(--cor-laranja)";
    } else {
        contador.style.color = "var(--texto-mutado)";
    }
});


// ================= 3. MENU HAMBÚRGUER (CELULAR) =================
const btnMenu = document.getElementById('btn-menu');
const menuNav = document.querySelector('.navbar nav');

btnMenu.addEventListener('click', function() {
    menuNav.classList.toggle('ativo');
});


// ================= 4. ENVIO DO FORMULÁRIO (FETCH API) =================
const formulario = document.getElementById('form-orcamento');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o refresh da página

    const botao = formulario.querySelector('.btn-enviar');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
    botao.disabled = true;

    const dados = new FormData(formulario);

    // Cole o link do seu Formspree aqui dentro das aspas abaixo:
    const urlFormspree = "https://formspree.io/f/seu_id_aqui"; 

    fetch(urlFormspree, {
        method: 'POST',
        body: dados,
        headers: { 'Accept': 'application/json' }
    })
    .then(resposta => {
        if (resposta.ok) {
            alert('Solicitação enviada com sucesso! Entrarei em contato em breve.');
            formulario.reset();
            contador.textContent = `${limiteMaximo} caracteres restantes`;
        } else {
            alert('Ops! Algo deu errado no servidor. Tente novamente.');
        }
    })
    .catch(() => {
        alert('Erro de rede. Verifique sua conexão.');
    })
    .finally(() => {
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    });
});