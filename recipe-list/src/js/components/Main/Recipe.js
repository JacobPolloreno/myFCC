import React from 'react';

export default class Recipe extends React.Component {

  render() {

    const { title } = this.props;

    return (
      <li>
        <div>
          <label>{title}</label>
          <button class="destroy"></button>
        </div>
      </li>
    );
  }
}
