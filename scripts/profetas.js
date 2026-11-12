const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const dados = await resposta.json();
        // console.table(dados.profetas); // teste temporário de resposta de dados
        exibirProfetas(dados.profetas); // o parâmetro é o array "profetas", não o objeto "dados"
    } catch (erro) {
        console.error('Não foi possível carregar os profetas:', erro);
        cartoes.textContent = 'Não foi possível carregar os dados dos profetas. Tente novamente mais tarde.';
    }
}

const formatarData = (dataIso) => {
    return new Date(dataIso).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });
};

const adicionarDado = (lista, rotulo, valor) => {
    const termo = document.createElement('dt');
    const descricao = document.createElement('dd');

    termo.textContent = `${rotulo}:`;
    descricao.textContent = valor;

    lista.appendChild(termo);
    lista.appendChild(descricao);
};

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        // Crie elementos para adicionar ao elemento div#cartoes
        let cartao = document.createElement('section');
        let nomeCompleto = document.createElement('h2');
        let dados = document.createElement('dl');
        let retrato = document.createElement('img');

        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        adicionarDado(dados, 'Nascimento', formatarData(profeta.nascimento));
        adicionarDado(dados, 'Lugar', profeta.localNascimento);
        adicionarDado(dados, 'Crianças', profeta.numeroFilhos);
        adicionarDado(dados, 'Anos de Serviço', profeta.duracao);
        adicionarDado(dados, 'Falecimento', profeta.morte ? formatarData(profeta.morte) : '—');

        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');

        cartao.appendChild(nomeCompleto);
        cartao.appendChild(dados);
        cartao.appendChild(retrato);

        cartoes.appendChild(cartao);
    });
};

obterDadosDeProfetas();