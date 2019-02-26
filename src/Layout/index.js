import React, { Component } from 'react';
import Square from '../Components/Square';
import StartGame from '../Components/StartGame';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/index';
import getSeries from '../../helpers';

import './styles.css';

class Layout extends Component {

  state = {
    squares: [
      {
        id: 0,
        color: 'red',
      },
      {
        id: 1,
        color: 'green',
      },
      {
        id: 2,
        color: 'blue',
      },
      {
        id: 3,
        color: 'yellow',
      },
    ],
    difficultyLevels: [
      {
        id: 0,
        text: 'Easy',
        value: 'easy',
        time: 1500,
      },
      {
        id: 1,
        text: 'Medium',
        value: 'medium',
        time: 1000,
      },
      {
        id: 2,
        text: 'Hard',
        value: 'hard',
        time: 400,
      },
    ],
    chosenLevel: {
      id: 0,
      text: 'Easy',
      value: 'easy',
      time: 1500,
    },
  };

  handleDifficultyChange = (e) => {
    const { difficultyLevels } = this.state;
    let value = e.target.value;
    this.setState({
      chosenLevel: difficultyLevels[value],
    });
  }

  render () {
    const { stepsToReproduce, stepsPart, updateStepsPartly, changeTurn, updateController, userStepUpdate,
            lightElementUp, activeSquare, resetActiveSquare, clickable, turn } = this.props;
    const { squares, difficultyLevels, chosenLevel } = this.state;

    return (
      <section className="layout">
        <h1 className="layout__title">Simon The Game</h1>
        <h3 className="layout__subtitle">Round {stepsPart.length}</h3>
        <div className="layout__select-wrapp">
        Level:
        <select className="layout__select" onChange={this.handleDifficultyChange} value={chosenLevel.id}>
          {difficultyLevels.map((level) => {
            return <option key={level.id} value={level.id}>{level.text}</option>
          })}
        </select>
        </div>
        <div className="layout__content">
          {squares.map((item) => {
            return <Square key={item.id}
                           activeSquare={activeSquare}
                           userStepUpdate={userStepUpdate}
                           clickable={clickable}
                           resetActiveSquare={resetActiveSquare}
                           lightElementUp={lightElementUp}
                           options={item}/>
          })}
        </div>
        <StartGame stepsToReproduce={stepsToReproduce}
                   updateStepsPartly={updateStepsPartly}
                   stepsPart={stepsPart}
                   changeTurn={changeTurn}
                   turn={turn}
                   changeSpeed={chosenLevel && chosenLevel.time || 1500}
                   updateController={updateController}
                   resetActiveSquare={resetActiveSquare}
                   lightElementUp={lightElementUp}/>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...actionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
