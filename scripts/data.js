const hoje = new Date();
const modificado = new Date(document.lastModified);

const data = modificado.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
});
const hora = modificado.toLocaleTimeString("pt-BR");

document.getElementById("anoAtual").textContent = hoje.getFullYear();
document.getElementById("ultimaModificacao").textContent = `Última Modificação: ${data} ${hora}`;