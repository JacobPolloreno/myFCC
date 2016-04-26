import React from 'react';
import { Link } from 'react-router';
import uuid from 'node-uuid';

import Recipe from '../components/Recipe';
import * as RecipeActions from '../actions/RecipeActions';
import RecipeStore from '../stores/RecipeStore';

export default class Main extends React.Component {
  constructor() {
    super();
    this.getRecipes = this.getRecipes.bind(this);
    this.handleDestroy =  this.handleDestroy.bind(this);
    this.state = {
      recipes: [],
      error: null,
      loading: false,
    };
  }

  componentWillMount() {
    console.log('List mounting');
    RecipeStore.on('change', this.getRecipes);
  }

  componentDidMount() {
    RecipeActions.requestRecipes();
  }

  componentWillUnmount() {
    console.log('List unmounting');
    RecipeStore.removeListener('change', this.getRecipes);
  }

  getRecipes() {
    const { recipes, loading, errors } = RecipeStore.getAll();

    this.setState({
      recipes,
      loading,
      errors,
    });
  }

  handleDestroy(key) {
    this.setState({ recipes: this.state.recipes.filter(({ title }) => title !== key) });
    RecipeActions.deleteRecipe(key);
  }

  render() {
    const RecipeComponents = this.state.recipes.map((recipe, idx) => {
      return (
        <li key={recipe.id} >
          <Recipe title={recipe.title} onRecipeClick={this.handleDestroy} />
        </li>
      );
    });

    return (
      <section class="main">
        <ul class="recipe-list">
          {this.state.loading ? <li>Loading...</li> : null}
          { RecipeComponents }
        </ul>
        <div class="footer">
        </div>
     </section>
    );
  }
}
