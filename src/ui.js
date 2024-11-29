import api from "./api.js";
const ui = {
    renderizarReceitas(paginate) {

    },

    async renderizarReceitasMaisProcuradas () {
        const divMaisRecentes = document.querySelector('#mais_recentes');
        try {
            const idsAleatorios = this.gerandoNumerosAleatorios(1, 50, 3)
            const receitasPromises = idsAleatorios.map((id) => api.buscarReceitaComId(id));
            const receitas = await Promise.all(receitasPromises);

            const cardsHTML = receitas
                                    .filter(receita => receita)
                                    .map(receita => this.criarCardHTML(receita))
                                    .join('')

            divMaisRecentes.innerHTML = cardsHTML;
        } catch (e) {
            alert("Erro para acessar receitas mais recentes")
            console.error("Erro para acessar receitas mais recentes: "+e)
        }
    },

    gerandoNumerosAleatorios(min, max, quantidade) {
        const numeros = new Set()
        while(numeros.size < quantidade) {
            const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
            numeros.add(numeroAleatorio);
        }
        return [...numeros]
    },

    criarCardHTML(receita) {
    return `
        <div class="bg-white rounded-lg border border-gray-200 shadow">
            <a onclick="this.abrirReceitas(${receita.id})">
                <img class="w-full rounded-t-lg" src="${receita.image}" alt="${receita.name}">
            </a>
            <div class="px-5 py-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 mb-4">
                    <a href="#">${receita.name}</a>
                </h3>
                <button type="button" class="bg-amarelo-principal rounded-lg px-10 space-x-4 sm:mt-0">
                    Ver mais
                </button>
            </div>
        </div>
    `;
    },

    abrirReceitas () {
        console.log("Abrir Receitas")
    },
}

export default ui