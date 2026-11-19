import { obterMembros, criarCartao } from './membros.mjs';

const membros = document.querySelector('#membros');
const contagem = document.querySelector('#contagem');
const botaoGrade = document.querySelector('#botaoGrade');
const botaoLista = document.querySelector('#botaoLista');

async function exibirMembros() {
    try {
        const lista = await obterMembros();
        contagem.textContent = `${lista.length} empresas no diretório.`;
        lista.forEach((membro) => membros.appendChild(criarCartao(membro)));
    } catch (erro) {
        console.error('Não foi possível carregar os membros:', erro);
        membros.textContent = 'Não foi possível carregar o diretório. Tente novamente mais tarde.';
    }
}

const definirVisualizacao = (modo) => {
    const grade = modo === 'grade';

    membros.classList.toggle('grade', grade);
    membros.classList.toggle('lista', !grade);
    botaoGrade.setAttribute('aria-pressed', grade);
    botaoLista.setAttribute('aria-pressed', !grade);
};

botaoGrade.addEventListener('click', () => definirVisualizacao('grade'));
botaoLista.addEventListener('click', () => definirVisualizacao('lista'));

exibirMembros();
