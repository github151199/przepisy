import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results_link" href="#${recipe.recipe_id}">
                <div class="results_data">
                    <h4 class="results_name">${recipe.title}</h4>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results_btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Strona ${type === 'prev' ? page - 1 : page + 1} </span>
        <svg class="search_icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    }
    else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results_link'));
    resultsArr.forEach(el => {
        el.classList.remove('results_link--active');
    })
    document.querySelector(`.results_link[href="#${id}"]`).classList.add('results_link--active');
}
