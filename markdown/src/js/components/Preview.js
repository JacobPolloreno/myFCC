import Marked from 'marked';
import React from 'react';

export default class Preview extends React.Component {

  createMarkup() {
    const __html = Marked(this.props.markup);
    return { __html };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()} />
    );
  }
}
