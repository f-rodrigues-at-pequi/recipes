import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    handleMaisRecentes()
    handleMenuMobile()
})

function handleMenuMobile() {
    const navLinks = document.querySelector(".nav-links");
    const menu = document.querySelector("#menu-mobile");
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.classList.toggle("top-[12%]");
        navLinks.classList.toggle("md:top-[9%]");
    })
}

function handleMaisRecentes () {
    const maisRecentes = document.querySelector("#section-mais-recentes")
    if(maisRecentes)
        ui.renderizarReceitasMaisProcuradas()
}