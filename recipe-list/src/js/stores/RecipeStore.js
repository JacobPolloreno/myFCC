import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class RecipeStore extends EventEmitter {
  constructor() {
    super();
    this.recipes = [];
    this.error = null;
    this.loading = false;
  }

  getAll() {
    return {
      recipes: this.recipes,
      error: this.error,
      loading: this.loading,
    };
  }

  getRecipe(title) {
    const idx = this.recipes.findIndex(function (recipe) {
      return recipe.title == title;
    });

    return {
      recipe: this.recipes[idx],
      error: this.error,
      loading: this.loading,
    };
  }

  createRecipe(id, ingredients, steps, title) {
    this.recipes.push({
      id,
      ingredients,
      steps,
      title,
    });

    this.emit('change');
  }

  editRecipe(id, ingredients, steps, title) {
    const idx = this.recipes.findIndex((recipe) => {
      return recipe.title == title;
    });

    this.recipes[idx].title = title;
    this.recipes[idx].ingredients = ingredients;
    this.recipes[idx].steps = steps;

    this.emit('change');
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_RECIPES':
        this.loading = true;
        this.emit('change');
        break;

      case 'RECEIVE_RECIPES':
        this.loading = false;
        this.recipes = action.recipes;
        this.emit('change');
        break;

      case 'RECEIVE_RECIPE':
        this.loading = false;
        this.recipes.push(action.recipe);
        this.emit('change');
        break;

      case 'FETCH_RECIPES_ERROR':
        this.loading = false;
        this.error = action.error;
        this.emit('change');
        break;

      case 'CREATE_RECIPE':
        this.createRecipe(action.id, action.ingredients, action.steps, action.title);
        break;

      case 'EDIT_RECIPE':
        this.editRecipe(action.id, action.ingredients, action.steps,  action.title);
        break;
    }
  }
}

const recipeStore = new RecipeStore();

dispatcher.register(recipeStore.handleActions.bind(recipeStore));

export default recipeStore;
