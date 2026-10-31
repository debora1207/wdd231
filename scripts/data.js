const hoje = new Date();

document.getElementById("anoAtual").textContent = hoje.getFullYear();
document.getElementById("ultimaModificacao").textContent = `Última Modificação: ${document.lastModified}`;