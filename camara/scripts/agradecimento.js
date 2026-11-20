const parametros = new URLSearchParams(window.location.search);
const resumo = document.querySelector("#resumo");
const semDados = document.querySelector("#semDados");

const campos = [
    ["nome", "Nome"],
    ["sobrenome", "Sobrenome"],
    ["email", "E-mail"],
    ["celular", "Celular"],
    ["organizacao", "Empresa ou organização"],
    ["timestamp", "Data e hora do envio"]
];

function formatarDataHora(valor) {
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
        return valor;
    }
    return data.toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" });
}

function exibirDados() {
    let exibidos = 0;

    campos.forEach(([chave, rotulo]) => {
        const valor = parametros.get(chave);
        if (!valor) return;

        const grupo = document.createElement("div");

        const termo = document.createElement("dt");
        termo.textContent = rotulo;

        const descricao = document.createElement("dd");
        descricao.textContent = chave === "timestamp" ? formatarDataHora(valor) : valor;

        grupo.append(termo, descricao);
        resumo.appendChild(grupo);
        exibidos++;
    });

    if (exibidos === 0) {
        semDados.hidden = false;
    }
}

exibirDados();