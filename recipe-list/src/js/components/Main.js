import React from 'react';

import Recipe from '../components/Main/Recipe';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [
        {
          id: 1234567,
          title: 'Chicken & Waffles',
          ingredients: 'chicken, flour, eggs',
        },
        {
          id: 4567829,
          title: 'Some stuff goes here',
          ingredients: 'water, sugar',
        },
      ],
    };
  }

  render() {
    const { recipes } = this.state;

    const RecipeComponents =  recipes.map((recipe) => {
      return <Recipe key={recipe.id} {...recipe}/>;
    });

    return (
      <section class="main">
        <ul class="recipe-list">
          {RecipeComponents}
        </ul>
      </section>
    );
  }
}
