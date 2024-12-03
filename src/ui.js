import api from "./api.js";
const ui = {
    async renderizarReceitasMaisProcuradas () {
        const divMaisRecentes = document.querySelector('#mais_recentes');
        try {
            const idsAleatorios = this.gerandoNumerosAleatorios(1, 50, 3)
            const receitasPromises = idsAleatorios.map((id) => api.buscarReceitaComId(id));
            const receitas = await Promise.all(receitasPromises);

            const cardsHTML = receitas
                                    .filter(receita => receita)
                                    .map(receita => this.criarCardMaisRecentesHTML(receita))
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

    criarCardMaisRecentesHTML(receita) {
    return `
        <div class="bg-white rounded-lg border border-gray-200 shadow">
            <a onclick="ui.abrirReceitas(${receita.id})">
                <img class="w-full rounded-t-lg" src="${receita.image}" alt="${receita.name}">
            </a>
            <div class="px-5 py-5">
                <h3 class="text-xl font-bold tracking-tight text-gray-900 mb-4">
                    <a href="#">${receita.name}</a>
                </h3>
                <button type="button" onclick="ui.abrirReceitas(${receita.id})" class="bg-amarelo-principal rounded-lg px-10 space-x-4 sm:mt-0">
                    Ver mais
                </button>
            </div>
        </div>
    `;
    },

    async renderizarReceitas (page) {
        if(!page) page = 1

        const divReceitas = document.querySelector('#div_receitas');
        try {

            const receitas = await api.buscarReceitasPaginadas(page)
            if( receitas.length > 0 ){
                const cardsHTML = receitas
                    .filter(receita => receita)
                    .map(receita => this.criarCardReceitas(receita))
                    .join('')

                divReceitas.innerHTML = cardsHTML;
            } else {
                console.log(receitas)
            }
        } catch (e) {
            alert("Erro para acessar receitas")
            console.error("Erro para acessar receitas: "+e)
        }
    },
    criarCardReceitas(receita) {
        return `
        <div class="flex flex-col md:flex-row mb-24">
                <a class="basis-2/5" onclick="ui.abrirReceitas(${receita.id})">
                    <img class="m-auto  rounded-t-3xl md:rounded-r-none md:rounded-l-3xl rounded-t-lg" src="${receita.image}" alt="${receita.name}">
                </a>
                <div class="basis-3/5 bg-branco-secundario py-5 items-center justify-center flex flex-col rounded-b-lg md:rounded-l-none md:rounded-r-3xl">
                    <h3 class="text-xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-4">
                        <a href="#">${receita.name}</a>
                    </h3>
                    <button type="button" onclick="ui.abrirReceitas(${receita.id})" class="bg-amarelo-principal py-2 font-bold w-[40%] lg:py-2 text-xl m-none rounded-lg">
                        Ver mais
                    </button>
                </div>
            </div>
        `;
    },

    abrirReceitas (id) {
        window.location.href = `about-recipe.html?id=${id}`
    },

    async handleAboutReceita(receitaId) {
        const divAboutRecipe = document.querySelector('#about_recipe');
        try {
            const receita = await api.buscarReceitaComId(receitaId)
            divAboutRecipe.innerHTML = this.criarCardAboutReceitas(receita);
        } catch (e) {
            alert("Erro para acessar sobre a receita")
            console.error("Erro para acessar sobre a receita: "+e)
        }
    },

    criarCardAboutReceitas(receita) {
        const ingredientes = receita.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')
        const instrucoes = receita.instructions.map(instruction => `<li>${instruction}</li>`).join('')
        return `  
                  <div class="h-[20vh] md:h-[30vh] bg-cover bg-center flex items-center justify-center" style="background-image: url('${receita.image}'); background-repeat: no-repeat">
                    <h1 class="text-3xl font-bold text-white">${receita.name}</h1>
                  </div>
                  <div class="w-[80%] m-auto py-10">
                    <div>
                      <h2 class="font-bold">Ingredientes</h2>
                      <ul class="list-disc w-[90%] m-auto py-4">
                        ${ingredientes}
                      </ul>
                    </div>
                    <div>
                      <h2 class="font-bold">Instruções</h2>
                      <ul class="list-decimal w-[90%] m-auto py-4">
                        ${instrucoes}
                      </ul>
                    </div>
                    <div>
                      <h2 class="font-bold">Mais Informações</h2>
                      <ul class="w-[95%] m-auto py-4">
                        <li>Tempo de Preparo: ${receita.prepTimeMinutes} minutos</li>
                        <li>Tempo de cozimento: ${receita.cookTimeMinutes} minutos</li>
                        <li>Porções: ${receita.servings}</li>
                        <li>Dificuldade:  ${receita.difficulty}</li>
                        <li>Tipo de cozinha: ${receita.cuisine}</li>
                        <li>Calorias por porção:  ${receita.caloriesPerServing}</li>
                      </ul>
                    </div>
                  </div>
            `
    },
    async renderizaSearchInput(valueToFilter){
        const listSearch = document.querySelector('#list-search')
        const searchResults = document.querySelector('#search-results')
        if(valueToFilter.length > 0){
            listSearch.classList.remove('hidden')
            listSearch.classList.add('absolute')

            const receitasBuscadas = await api.buscarTodasReceitas()
            const receitasFiltradas = receitasBuscadas.filter(receita =>
                receita.name.toLowerCase().includes(valueToFilter.toLowerCase()
            ))
            const listaReceitasParaIndexar = receitasFiltradas.map(receita => this.criarListaResultadoBusca(receita)).join('')
            searchResults.innerHTML = listaReceitasParaIndexar
        }
    },
    criarListaResultadoBusca(receita){
        return `<li onclick="ui.abrirReceitas(${receita.id})" class="hover:bg-branco-secundario transition duration-500 ease-in-out px-1 py-2">${receita.name}</li>`
    }
}
window.ui = ui
export default ui