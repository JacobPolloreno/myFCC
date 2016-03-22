import Localforage from 'localforage';
import uuid from 'node-uuid';

const RecipeData = {
  init() {
    // Localforage.clear();
    const recipes = [{
      title: 'Curry Chicken',
      value: {
        id: uuid.v4(),
        ingredients: [{
          name: 'curry',
          id: uuid.v4(),
        }, {
          name: 'chicken',
          id: uuid.v4(),
        }, {
          name: 'water',
          id: uuid.v4(),
        }, {
          name: 'tomatoes',
          id: uuid.v4(),
        }, {
          name: 'onions',
          id: uuid.v4(),
        }, {
          name: 'garlic',
          id: uuid.v4(),
        }, {
          name: 'salt',
          id: uuid.v4(),
        }, {
          name: 'pepper',
          id: uuid.v4(),
        }, ],
        steps: [{
          info: 'Heat saucepan up to medium high',
          id: uuid.v4(),
        }, {
          info: 'Add onions and garlic. Cook till translucent.',
          id: uuid.v4(),
        }, {
          info: 'Add curry powders and cook for 2 minutes',
          id: uuid.v4(),
        }, {
          info: 'Add chicken and brown',
          id: uuid.v4(),
        }, ],
      },
    }, {
      title: 'Oatmeal',
      value: {
        id: uuid.v4(),
        ingredients: [{
          name: '1 cup regular rolled oats',
          id: uuid.v4(),
        }, {
          name: '1/4 cup dried cranberries',
          id: uuid.v4(),
        }, {
          name: '1/4 cup chopped walnuts',
          id: uuid.v4(),
        }, {
          name: '1 TBS blackstrap molasses',
          id: uuid.v4(),
        }, {
          name: '1 TBS ground flaxseeds',
          id: uuid.v4(),
        }, {
          name: '1 cup milk or dairy-free milk alternative',
          id: uuid.v4(),
        }, {
          name: '2-1/4 cups water',
          id: uuid.v4(),
        }, {
          name: 'salt',
          id: uuid.v4(),
        }, ],
        steps: [{
          info: 'Combine the water and salt in a small saucepan and turn the heat to high.',
          id: uuid.v4(),
        }, {
          info: 'When the water boils, turn the heat to low, add oatmeal, and cook, stirring, until the water is just absorbed, about 5 minutes.' +
            'Add cinnamon, cranberries, walnuts, and flaxseeds. Stir, cover the pan, and turn off heat. Let set for 5 minutes. Serve with milk and molasses.',
          id: uuid.v4(),
        }, ],
      },
    }, ];

    for (let recipe of recipes) {
      Localforage.setItem(recipe.title, recipe.value);
    }
  },
};

export default RecipeData;