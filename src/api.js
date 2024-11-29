const URL_API = "http://localhost:3000/recipes"
const api = {

    async buscarReceitaComId(id) {
        try {
            const response = await fetch(`${URL_API}/?id=${id}`)
            const receita = await response.json()
            return receita[0]
        }
         catch (error) {
            alert("Erro para buscar a receita")
        }
    },
    async buscarTodasReceitas() {
        try {
            const response = await fetch(`${URL_API}`)
            return await response.json()
        }
         catch (error) {
            alert("Erro para buscar as receitas")
        }
    },
}

export default api