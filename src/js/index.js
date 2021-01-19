
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {};

if (!state.search) {
    recipeView.renderGreetings();
}

const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();

        try {
            await state.search.getResults();
            searchView.renderResults(state.search.result);
        } catch (error) {
            console.log(error);
        }
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        recipeView.clearRecipe();
        if (state.search) searchView.highlightSelected(id);
        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }
    }
}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

