const botaoMenu = document.querySelector("#botaoMenu");
const menuPrincipal = document.querySelector("#menuPrincipal");

botaoMenu.addEventListener("click", () => {
    const aberto = menuPrincipal.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.innerHTML = aberto ? "&times;" : "&#9776;";
});