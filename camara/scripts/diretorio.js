const urlMembros = 'dados/membros.json';
const membros = document.querySelector('#membros');
const botaoGrade = document.querySelector('#botaoGrade');
const botaoLista = document.querySelector('#botaoLista');

const niveis = {
    1: 'Membro',
    2: 'Prata',
    3: 'Ouro'
};

async function obterMembros() {
    try {
        const resposta = await fetch(urlMembros);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const dados = await resposta.json();
        exibirMembros(dados.membros);
    } catch (erro) {
        console.error('Não foi possível carregar os membros:', erro);
        membros.textContent = 'Não foi possível carregar o diretório. Tente novamente mais tarde.';
    }
}

const exibirMembros = (lista) => {
    document.querySelector('#contagem').textContent = `${lista.length} empresas no diretório.`;

    lista.forEach((membro) => {
        const cartao = document.createElement('article');
        cartao.classList.add('cartao');

        // Área do logotipo
        const areaLogo = document.createElement('div');
        areaLogo.classList.add('area-logo');

        const logo = document.createElement('img');
        logo.setAttribute('src', `imagens/${membro.imagem}`);
        logo.setAttribute('alt', `Logotipo de ${membro.nome}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '120');
        logo.setAttribute('height', '120');

        const cidadeTopo = document.createElement('p');
        cidadeTopo.classList.add('cidade-topo');
        cidadeTopo.textContent = membro.cidade.split(' ')[0];

        areaLogo.append(logo, cidadeTopo);

        // Corpo do cartão
        const corpo = document.createElement('div');
        corpo.classList.add('corpo');

        const titulo = document.createElement('div');
        titulo.classList.add('titulo');

        const nome = document.createElement('h3');
        nome.textContent = membro.nome;

        const categoria = document.createElement('p');
        categoria.classList.add('categoria');
        categoria.textContent = membro.categoria;

        const nivel = document.createElement('span');
        nivel.classList.add('nivel', `nivel-${membro.nivel}`);
        nivel.textContent = niveis[membro.nivel];

        titulo.append(nome, categoria, nivel);

        const descricao = document.createElement('p');
        descricao.classList.add('descricao');
        descricao.textContent = membro.descricao;

        const endereco = document.createElement('p');
        endereco.classList.add('endereco');
        endereco.innerHTML = `${membro.endereco}<br>${membro.cidade}`;

        const telefone = document.createElement('p');
        telefone.classList.add('telefone');
        telefone.textContent = membro.telefone;

        const site = document.createElement('a');
        site.classList.add('site');
        site.setAttribute('href', membro.site);
        site.setAttribute('target', '_blank');
        site.setAttribute('rel', 'noopener');
        site.textContent = membro.site;

        corpo.append(titulo, descricao, endereco, telefone, site);
        cartao.append(areaLogo, corpo);
        membros.appendChild(cartao);
    });
};

// Alternar entre grade e lista
const definirVisualizacao = (modo) => {
    const grade = modo === 'grade';

    membros.classList.toggle('grade', grade);
    membros.classList.toggle('lista', !grade);
    botaoGrade.setAttribute('aria-pressed', grade);
    botaoLista.setAttribute('aria-pressed', !grade);
};

botaoGrade.addEventListener('click', () => definirVisualizacao('grade'));
botaoLista.addEventListener('click', () => definirVisualizacao('lista'));

obterMembros();