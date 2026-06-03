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


// ================= 4. ENVIO DO FORMULÁRIO (WEB3FORMS - ATUALIZADO) =================
const formulario = document.getElementById('form-orcamento');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Impede o refresh da página

    const botao = formulario.querySelector('.btn-enviar');
    const textoOriginal = botao.innerHTML;
    botao.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin"></i>';
    botao.disabled = true;

    // 1. Cria o objeto de dados capturando o formulário do HTML
    const dados = new FormData(formulario);

    // 2. Aqui injetamos a sua chave real do Web3Forms que veio do site
    dados.append("access_key", "baeecfe6-dee0-43b4-b7b6-2a60bf9074ba");

    // O link de envio do Web3Forms é único e fixo
    const urlWeb3Forms = "https://api.web3forms.com/submit"; 

    // 3. Faz o disparo para o servidor do Web3Forms em segundo plano
    fetch(urlWeb3Forms, {
        method: 'POST',
        body: dados
    })
    .then(resposta => resposta.json()) // Converte a resposta do servidor para JSON
    .then(resultado => {
        if (resultado.success) {
            // Se o envio deu certo no Web3Forms:
            alert('Solicitação enviada com sucesso! Entrarei em contato em breve.');
            formulario.reset();
            contador.textContent = `${limiteMaximo} caracteres restantes`;
            contador.style.color = "var(--texto-mutado)";
        } else {
            // Se houver algum erro de validação deles
            alert('Erro no envio: ' + resultado.message);
        }
    })
    .catch(() => {
        alert('Erro de rede. Verifique sua conexão.');
    })
    .finally(() => {
        // Devolve o botão ao estado original independente de sucesso ou erro
        botao.innerHTML = textoOriginal;
        botao.disabled = false;
    });
});