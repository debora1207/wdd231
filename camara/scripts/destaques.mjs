import { obterMembros, criarCartao } from './membros.mjs';

const destaques = document.querySelector('#destaques');
const QUANTIDADE = 3;

// Embaralha uma cópia da lista (algoritmo de Fisher-Yates)
const embaralhar = (lista) => {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
};

async function exibirDestaques() {
    try {
        const membros = await obterMembros();

        // Só entram membros de nível prata (2) ou ouro (3)
        const elegiveis = membros.filter((membro) => membro.nivel >= 2);

        embaralhar(elegiveis)
            .slice(0, QUANTIDADE)
            .forEach((membro) => destaques.appendChild(criarCartao(membro)));
    } catch (erro) {
        console.error('Não foi possível carregar os destaques:', erro);
        destaques.textContent = 'Não foi possível carregar as empresas em destaque.';
    }
}

exibirDestaques();
