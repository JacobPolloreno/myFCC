import React from 'react';

import Preview from './Preview';

export default class Textbox extends React.Component {
  constructor() {
    super();
    this.state = {
      markup: 'Heading\n=======\n\nSub-heading\n-----------\n\n### Another deeper heading\n',
    };
  }

  handleChange(e) {
    const markup = e.target.value;
    this.setState({ markup });
  }

  render() {

    return (
      <div>
        <div class="col-md-6">
          <textarea class="form-control" name="markup-box" rows="30" onChange={ this.handleChange.bind(this) }>
            { this.state.markup }
          </textarea>
        </div>
        <div class="col-md-6">
          <Preview markup={this.state.markup}/>
        </div>
      </div>
    );
  }
}
