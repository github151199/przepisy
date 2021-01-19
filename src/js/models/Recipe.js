export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            await fetch(
                `https://forkify-api.herokuapp.com/api/get?rId=${
                this.id}`)
                .then(res => res.json())
                .then(data => {
                    this.title = data.recipe.title;
                    this.author = data.recipe.publisher;
                    this.img = data.recipe.image_url;
                    this.url = data.recipe.source_url;
                    this.ingredients = data.recipe.ingredients;
                })
        } catch (error) {
            console.log(error);
        }
    }
}
