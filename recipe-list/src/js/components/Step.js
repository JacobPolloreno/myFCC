import React from 'react';

export default class Step extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onStepClick(this.props.index);
  }

  render() {
    const { info } = this.props;

    return (
      <div>
        { info }
        <button class="destroy" onClick={this.onClick}></button>
      </div>
    );
  }
}
