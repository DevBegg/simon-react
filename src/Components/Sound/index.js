import React, { Component } from 'react';

export default class Sound extends Component {

  render() {

    const { fileName } = this.props;

    return(
      // <audio style={{"display": "none"}} autoPlay onEnded={stopSound}>
      <audio style={{"display": "none"}} autoPlay>
        <source src={`/sounds/${fileName}.ogg`} type="audio/ogg" />
        <source src={`/sounds/${fileName}.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    )
  }
}
