import React from 'react';

export default class Row extends React.Component {

  render() {
    const { index, username, img, recent, alltime } = this.props;
    const url = 'http://freecodecamp.com/' + username;

    const imgStyle = {
      width: '40px',
    };

    const mediaBodyStyle = {
      width: 'inherit',
      verticalAlign: 'middle',
    };

    return (
      <tr>
        <td>{index}</td>
        <td>
          <a class="media" target="_blank" href={url}>
          <div class="media-left">
            <img class="media-object" src={img} alt={username + ' photo'} style={imgStyle}/>
          </div>
          <div class="media-body" style={mediaBodyStyle}>
            <h4 class="media-heading">{username}</h4>
          </div>
        </a>
        </td>
        <td class="text-center">{recent}</td>
        <td class="text-center">{alltime}</td>
      </tr>
    );
  }
}
