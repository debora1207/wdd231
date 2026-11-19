const CHAVE_API = '42b185f884ec5682e86f43ebe494fcdb';
const LATITUDE = -23.5329;   // Osasco, SP
const LONGITUDE = -46.7917;

const base = 'https://api.openweathermap.org/data/2.5';
const parametros = `lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&lang=pt_br&appid=${CHAVE_API}`;

const climaAtual = document.querySelector('#climaAtual');
const previsao = document.querySelector('#previsao');

const primeiraMaiuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

async function buscar(caminho) {
    const resposta = await fetch(`${base}/${caminho}?${parametros}`);
    if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
    }
    return resposta.json();
}

function exibirClimaAtual(dados) {
    const icone = document.createElement('img');
    icone.setAttribute('src', `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`);
    icone.setAttribute('alt', '');
    icone.setAttribute('width', '64');
    icone.setAttribute('height', '64');

    const texto = document.createElement('div');

    const temperatura = document.createElement('p');
    temperatura.classList.add('temperatura');
    temperatura.textContent = `${Math.round(dados.main.temp)}°C`;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao-clima');
    descricao.textContent = primeiraMaiuscula(dados.weather[0].description);

    texto.append(temperatura, descricao);
    climaAtual.replaceChildren(icone, texto);
}

function exibirPrevisao(dados) {
    const deslocamento = dados.city.timezone; // segundos em relação ao UTC
    // Converte um horário (em segundos) para a data local no formato AAAA-MM-DD
    const diaLocal = (segundos) =>
        new Date((segundos + deslocamento) * 1000).toISOString().slice(0, 10);

    const hoje = diaLocal(Date.now() / 1000);
    const dias = {};

    dados.list.forEach((item) => {
        const dia = diaLocal(item.dt);
        if (dia === hoje) return; // a previsão começa a partir de amanhã
        (dias[dia] ??= []).push(item.main.temp);
    });

    previsao.replaceChildren();

    Object.entries(dias).slice(0, 3).forEach(([dia, temperaturas]) => {
        const data = new Date(`${dia}T00:00:00Z`);
        const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' });
        const diaMes = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });

        const item = document.createElement('li');

        const rotulo = document.createElement('span');
        rotulo.classList.add('dia');
        rotulo.textContent = `${primeiraMaiuscula(diaSemana)} ${diaMes}`;

        const temps = document.createElement('span');
        temps.classList.add('temps');
        temps.textContent = `Máx ${Math.round(Math.max(...temperaturas))}° / Mín ${Math.round(Math.min(...temperaturas))}°`;

        item.append(rotulo, temps);
        previsao.appendChild(item);
    });
}

async function carregarClima() {
    try {
        const [atual, proximos] = await Promise.all([buscar('weather'), buscar('forecast')]);
        exibirClimaAtual(atual);
        exibirPrevisao(proximos);
    } catch (erro) {
        console.error('Não foi possível carregar o clima:', erro);
        climaAtual.textContent = 'Não foi possível carregar o clima agora. Verifique a chave da API.';
        previsao.replaceChildren();
    }
}

carregarClima();
