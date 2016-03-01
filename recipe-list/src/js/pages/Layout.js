import React from 'react';

import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default class Layout extends React.Component {

  render() {

    return (
        <div>
          <section class="recipes">
            <Header />
            <Main />
            <Footer />
          </section>
        </div>

    );
  }
}
