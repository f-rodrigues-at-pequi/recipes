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
             return null
        }
    },
    async buscarReceitasPaginadas(page) {
        try {
            const response = await fetch(`${URL_API}/?_page=${page}`)
            const receita = await response.json()
            console.log(receita.data)
            return receita.data
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
window.api = api
export default api