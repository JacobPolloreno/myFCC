import React from 'react';

export default class Ingredient extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onIngredientClick(this.props.index);
  }

  render() {
    const { name } = this.props;

    return (
      <div>
        { name }
        <button class="destroy" onClick={this.onClick}></button>
      </div>
    );
  }
}
