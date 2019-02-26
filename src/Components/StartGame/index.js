import React, { PureComponent } from 'react';
import './styles.css';

export default class StartGame extends PureComponent {

  startGame = () => {
    const { stepsToReproduce, updateStepsPartly } = this.props;
    let init = stepsToReproduce.slice(0,1);
    this.playSequence(init);
    updateStepsPartly(init);
  };

  playSequence = (sequence) => {
    const { lightElementUp, resetActiveSquare, changeTurn, updateController, changeSpeed } = this.props;
    let i = 0;
    var interval = setInterval(() => {
      lightElementUp(sequence[i]);
      i++;
      setTimeout(() => {
        resetActiveSquare();
      }, 500);
      if (i >= sequence.length) {
        clearInterval(interval);
        changeTurn();
        updateController();
      }
    }, changeSpeed);
  };

  render () {
    const { turn, stepsPart } = this.props;
    turn === 'PlaySeq' && this.playSequence(stepsPart);
    return (
      <button className="startBtn" onClick={this.startGame}>Start game</button>
    )
  }
}
