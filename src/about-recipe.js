import api from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const receitaId = params.get('id')

    if(receitaId) ui.handleAboutReceita(receitaId)
})