const URL_API = "https://api-recipes-one.vercel.app/recipes"
const api = {

    async buscarReceitaComId(id) {
        try {
            const response = await fetch(`${URL_API}/?id=${id}`)
            const receita = await response.json()
            return receita[0]
        }
         catch (error) {
            alert("Erro para buscar a receita")
            console.error(error)
             return null
        }
    },
    async buscarReceitasPaginadas(page) {
        try {
            const response = await fetch(`${URL_API}/?_page=${page}`)
            const receita = await response.json()
            console.log(receita)
            return receit
        }
         catch (error) {
            alert("Erro para buscar as Receitas")
             return null
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