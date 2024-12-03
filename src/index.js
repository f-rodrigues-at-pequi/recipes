import ui from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    handleMaisRecentes()
    handleMenuMobile()
    handleReceitas()
    handleSearch()
})

function handleMenuMobile() {
    const navLinks = document.querySelector(".nav-links");
    const menu = document.querySelector("#menu-mobile");
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.classList.toggle("top-[15%]");
        navLinks.classList.toggle("md:top-[12%]");
    })
}

function handleMaisRecentes () {
    const maisRecentes = document.querySelector("#section-mais-recentes")
    if(maisRecentes)
        ui.renderizarReceitasMaisProcuradas()
}

function handleReceitas () {
    const divReceitas = document.querySelector("#div_receitas");
    if(divReceitas){
            ui.renderizarReceitas()
            const pagination = document.querySelectorAll(".myPaginate");
            pagination.forEach(el => {
                el.addEventListener("click", (e) => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                    ui.renderizarReceitas(el.textContent);
                })
            })

    }
}

function handleSearch() {
    const search = document.querySelector("#default-search");

    search.addEventListener("keyup", async (e) => {
        await ui.renderizaSearchInput(e.target.value);
    });

    search.addEventListener("blur", async (e) => {
        if (e.target.value === '') {
            await ui.renderizaSearchInput('');
        }
    });
}