document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#post-api");

    button.addEventListener("click", async (e) => {
        e.preventDefault();

        let data = await fetch(`https://dummyjson.com/recipes?skip=${30}`)
        data = await data.json();
        data = data.recipes;

        console.log(data)


        const promises = data.map(data =>
            fetch("http://localhost:3000/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (!response.ok) throw new Error("Erro ao criar post");
                    return response.json();
                })
                .then(result => console.log(`Post criado com ID: ${result.id}`))
                .catch(error => console.error("Erro:", error))
        );

        await Promise.all(promises);
    })
})
