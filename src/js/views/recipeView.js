import { elements } from './base';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
};

export const renderGreetings = () => {
    const markup = `
        <h1 style="padding-top: 20px; padding-left: 20px;">Witaj na 
        naszej stronie. Wpisz frazę, aby zobaczyć przepisy.</h1>`;
    elements.recipe.insertAdjacentHTML('beforeend', markup);
};

const createIngredient = (ingredient) => `
    <li class="recipe_item">
        <svg class="ingredient_icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div>${ingredient}</div>
    </li>`;

export const renderRecipe = (recipe) => {
    const markup = `
    <figure class="recipe_fig">
        <img src="${recipe.img}" alt="${recipe.title}" 
        class="recipe_img">
        <h1 class="recipe_title">
           <span>Przepis na: ${recipe.title}</span>
        </h1>
    </figure>

    <div class="recipe_ingredients_and_directions">
        <div class="recipe_ingredients">
           <ul class="recipe_ingredient-list">
               ${recipe.ingredients.map((el) =>
        createIngredient(el)).join('')}
           </ul>
        </div>

        <div class="recipe_directions">
           <a class="btn-small recipe_btn" 
           href="${recipe.url}" target="_blank">
               <span>Strona autora</span>
           </a>
        </div>
    </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
