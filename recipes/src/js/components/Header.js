import React from 'react';

import RecipeAddForm from './Header/RecipeAddForm';

export default class Header extends React.Component {

  render() {
    const { location } = this.props;
    const headerComponent = location.pathname === '/' ? <RecipeAddForm /> : null;

    return (
      <header>
        <h1>My Recipes</h1>
        { headerComponent }
      </header>

    );
  }
}
