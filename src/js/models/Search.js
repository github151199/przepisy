export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            await fetch(
                `https://forkify-api.herokuapp.com/api/search?q=${
                this.query}`)

                .then(res => res.json())
                .then(data => this.result = data.recipes)
        } catch (error) {
            console.log(error);
        }
    }
}
