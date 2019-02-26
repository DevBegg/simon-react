import React, { Component } from 'react';
import Sound from '../Sound';
import './styles.css';

export default class Square extends Component {

  handleClick = id => () => {
    const { lightElementUp, resetActiveSquare, userStepUpdate, clickable } = this.props;
    if (clickable) {
      lightElementUp(id);
      setTimeout(() => {
        resetActiveSquare();
      }, 400);
      userStepUpdate(id);
    }
  }

  render () {
    const { options: { id, color }, activeSquare } = this.props;
    const isActive = activeSquare == id;

    return (
      <div className={isActive ? "square square--active" : 'square'}
           style={{background: color}}
           onClick={this.handleClick(id)}>
        {isActive && <Sound fileName={id}/>}
      </div>
    )
  }
}
