import React from 'react';

// import Recipes from '../components/Recipes';

export default class Header extends React.Component {

  render() {

    return (
    <header>
      <h1>My Recipes</h1>
      <form>
        <input class="new-recipe" placeholder="Add a new recipe"/>
      </form>
    </header>

    );
  }
}
