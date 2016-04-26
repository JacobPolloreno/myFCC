import React from 'react';

import Header from '../components/Header';

export default class Layout extends React.Component {

  render() {
    const { location } = this.props;
    return (
        <div>
          <section class="recipes">
            <Header location ={location} />
            {this.props.children}
          </section>
        </div>

    );
  }
}
