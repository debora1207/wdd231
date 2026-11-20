const campoTimestamp = document.querySelector("#timestamp");
campoTimestamp.value = new Date().toISOString();

document.querySelectorAll("[data-modal]").forEach((botao) => {
    const modal = document.getElementById(botao.dataset.modal);
    botao.addEventListener("click", () => modal.showModal());
});

// Fecha o modal pelo botão X ou ao clicar fora dele (a tecla Esc já funciona por padrão)
document.querySelectorAll("dialog").forEach((modal) => {
    modal.querySelector(".fechar").addEventListener("click", () => modal.close());

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.close();
        }
    });
});