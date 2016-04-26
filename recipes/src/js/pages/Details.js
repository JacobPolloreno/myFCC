import React from 'react';
import uuid from 'node-uuid';
import { IndexLink } from 'react-router';
import history from '../history';

import Ingredient from '../components/Ingredient';
import * as RecipeActions from '../actions/RecipeActions';
import RecipeStore from '../stores/RecipeStore';
import Step from '../components/Step';

export default class RecipeDetails extends React.Component {
  constructor() {
    super();
    this.getRecipe = this.getRecipe.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.handleRemoveStep = this.handleRemoveStep.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleStepSubmit = this.handleStepSubmit.bind(this);
    this.state = {
      recipe: {
        title: '',
        ingredients: [],
        steps: [],
      },
      title: '',
      ingredient: '',
      step: '',
      loading: false,
      errors: null,
    };
  }

  componentWillMount() {
    RecipeStore.on('change', this.getRecipe);
  }

  componentDidMount() {
    const title = this.props.params.title.replace(/-/g, ' ');
    this.setState({ title });
    RecipeActions.requestRecipe(title);
  }

  componentWillUnmount() {
    RecipeStore.removeListener('change', this.getRecipe);
  }

  getRecipe() {
    const { recipe, loading, errors } = RecipeStore.getRecipe(this.state.title);
    this.setState({
      recipe,
      loading,
      errors,
    });
  }

  handleIngredientChange(e) {
    e.preventDefault();
    const ingredient = e.target.value;
    this.setState({ ingredient });
  }

  handleStepChange(e) {
    e.preventDefault();
    const step = e.target.value;
    this.setState({ step });
  }

  handleIngredientSubmit(e) {
    e.preventDefault();
    const { recipe, ingredient } = this.state;
    const id = uuid.v4();
    recipe.ingredients.push({ name: ingredient.trim(), id });
    this.setState({ ingredient:'', recipe });
  }

  handleStepSubmit(e) {
    e.preventDefault();
    const { recipe, step } = this.state;
    const id = uuid.v4();
    recipe.steps.push({ info: step.trim(), id });
    this.setState({ step:'', recipe });
  }

  handleSave(e) {
    e.preventDefault();
    const { recipe } = this.state;
    RecipeActions.editRecipe(recipe.id, recipe.ingredients, recipe.steps, recipe.title);

    // history.replaceState(null, '/');
  }

  handleRemoveIngredient(index) {
    const { recipe } = this.state;
    recipe.ingredients.splice(index, 1);
    this.setState({ recipe });
  }

  handleRemoveStep(index) {
    const { recipe } = this.state;
    recipe.steps.splice(index, 1);
    this.setState({ recipe });
  }

  render() {
    const { recipe } = this.state;
    const ingredientList = recipe.ingredients.map((ingredient, idx) => {
      return (
        <li key={ingredient.id}>
          <Ingredient name={ingredient.name} index={idx} onIngredientClick={this.handleRemoveIngredient} />
        </li>
      );
    });

    const stepsList = recipe.steps.map((step, idx) => {
      return (
        <li key={step.id}>
          <Step info={step.info} index={idx} onStepClick={this.handleRemoveStep}/>
        </li>
      );
    });

    return (
      <section class="recipe-details">
        <h2>{recipe.title}</h2>
        <h4>Ingredients</h4>
        <ul>
          {ingredientList}
          <li>
            <form onSubmit={this.handleIngredientSubmit}>
              <input class="new-input" type="text" placeholder="Add a new ingredient." value={this.state.ingredient} onChange={this.handleIngredientChange} />
            </form>
          </li>
        </ul>
        <h4>Steps</h4>
        <ol>
          {stepsList}
          <li>
            <form onSubmit={this.handleStepSubmit}>
              <input class="new-input" type="text" placeholder="Add a new step." value={this.state.step} onChange={this.handleStepChange}/>
            </form>
          </li>
        </ol>
        <div class="footer">
          <IndexLink to='/' class="cancel">Cancel</IndexLink>
          <button class="save" onClick={this.handleSave}>Save</button>
        </div>
      </section>
    );
  }
}
