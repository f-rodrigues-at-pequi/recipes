import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about-recipe.html',
                recipes: './recipes.html',
                aboutus: './about-us.html',
            },
        }
    }
})