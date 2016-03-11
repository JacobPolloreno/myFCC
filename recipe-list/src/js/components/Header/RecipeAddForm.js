import React from 'react';

import * as RecipeActions from '../../actions/RecipeActions';

export default class RecipeForm extends React.Component {
  constructor() {
    super();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: '',
    };
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title } = this.state;
    title.trim();
    if (!title) {
      return;
    }

    RecipeActions.createRecipe(title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <form onSubmit= { this.handleSubmit }>
        <input type = "text" class="new-recipe" placeholder="Add a new recipe" value={ this.state.title } onChange = {this.handleTitleChange} />
      </form >
    );
  }
}
