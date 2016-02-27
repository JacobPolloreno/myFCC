import React from 'react';

import Textbox from './Textbox';

export default class Layout extends React.Component {

  render() {
    const containerStyle = {
      marginTop: '60px',
    };
    return (
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
              <Textbox />
            </div>
          </div>
        </div>

    );
  }
}
