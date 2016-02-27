import React from 'react';

import Table from '../components/Table';

export default class Layout extends React.Component {

  render() {
    const containerStyle = {
      marginTop: '60px',
    };

    return (
        <div class="container" style={containerStyle}>
          <div class="row text-center">
            <h1>Leaderboard</h1>
          </div>
          <div class="row">
              <div class="table-responsive">
                <Table />
              </div>
          </div>
        </div>

    );
  }
}
