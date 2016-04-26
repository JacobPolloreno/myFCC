import React from 'react';
import { Link } from 'react-router';

export default class Recipe extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onRecipeClick(this.props.title);
  }

  render() {

    const { title } = this.props;
    const urlTitle = title.replace(/\s+/g, '-');

    return (
      <div>
        <Link to={'details/' + urlTitle}><label>{ title }</label></Link>
        <button class="destroy" onClick={ this.onClick}></button>
      </div>
    );
  }
}
