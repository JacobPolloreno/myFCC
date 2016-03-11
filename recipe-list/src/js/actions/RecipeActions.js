import Localforage from 'localforage';
import uuid from 'node-uuid';

import dispatcher from '../dispatcher';

Localforage.config({
  name: 'myRecipes',
  description: 'Local storage DB used for myRecipes react app',
});

/*
*
*
*/
function createRecipe(title, ingredients = [], steps = []) {
  const id = uuid.v4();
  const value  = { id, ingredients, steps };
  Localforage.setItem(title, value).then(function () {
    dispatcher.dispatch({
      type: 'CREATE_RECIPE',
      id,
      ingredients,
      steps,
      title,
    });
  });
}

function deleteRecipe(title) {
  Localforage.removeItem(title).then(function () {
    dispatcher.dispatch({
      type: 'DELETE_RECIPE',
      title,
    });
  });
}

function editRecipe(id, ingredients, steps, title) {
  const value = { id, ingredients, steps };
  Localforage.setItem(title, value).then(function () {
    dispatcher.dispatch({
      type: 'EDIT_RECIPE',
      id,
      ingredients,
      steps,
      title,
    });
  });
}

function requestRecipe(title) {
  Localforage.getItem(title).then(function (recipe) {
    recipe.title = title;

    dispatcher.dispatch({
      type: 'RECEIVE_RECIPE',
      recipe,
    });
  });
}

function requestRecipes() {
  dispatcher.dispatch({
    type: 'FETCH_RECIPES',
  });

  const recipes = [];

  Localforage.iterate(function (recipe, title) {
    recipe.title = title;
    recipes.push(recipe);
  }).then(function (result) {

    dispatcher.dispatch({
      type: 'RECEIVE_RECIPES',
      recipes,
    });
  }, function (error) {

    dispatcher.dispatch({
      type: 'FETCH_RECIPES_ERROR',
      error,
    });
  });

}

export { requestRecipes,  requestRecipe, editRecipe, deleteRecipe, createRecipe };
