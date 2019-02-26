import { createStore, applyMiddleware } from 'redux';
import getRandomSteps from '../../helpers';

const isStepsEqual = (stepsPart, lengthController, userSteps) => {
   return stepsPart[lengthController] == userSteps[lengthController];
};

const initialState = {
  turn: '',
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
  stepsPart: [],
  userSteps: [],
  clickable: false,
  chosenLevel: {
    id: 0,
    text: 'Easy',
    value: 'easy',
    time: 1500,
  },
  activeSquare: null,
  lengthController: -1,
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
  stepsToReproduce: getRandomSteps(),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_STEP_UPDATE': {
      state.lengthController ++;
      state.userSteps = [...state.userSteps, action.payload];
      let nextTurn = isStepsEqual(state.stepsPart, state.lengthController, state.userSteps);
      // if (state.stepsPart.length == state.stepsToReproduce.length) {
      //   alert('Congratilations! You have won.');
      //   return{ ...initialState, stepsToReproduce: getRandomSteps() }
      // }
      if (state.userSteps.length == state.stepsPart.length && nextTurn) {
        state.activeSquare = action.payload;
        let incremented = state.stepsToReproduce.slice(0, state.userSteps.length + 1);
        return {
          ...state,
          stepsPart: incremented,
          activeSquare: state.activeSquare,
          turn: 'PlaySeq',
          userSteps: [],
        };
      }
      if (nextTurn) {
        return {...state};
      } else {
        alert('Sorry, you lost');
        return {
          ...state,
          // turn: 'PlaySeq',
          activeSquare: null,
          stepsToReproduce: getRandomSteps(),
          stepsPart: [],
          userSteps: []
        };
      }
    }
    case 'UPDATE_STEPS_PART': {
      return {
        ...state,
        stepsPart: action.payload
      };
    }
    case 'TO_USERS_TURN': {
      return {
        ...state,
        turn: action.payload,
        clickable: true
      };
    }
    case 'UPDATE_ELEMENT_INDEX': {
      return {
        ...state,
        lengthController: action.payload
      }
    }
    case 'LIGHT_ELEMENT_UP': {
      return {
        ...state,
        activeSquare: action.payload
      };
    }
    case 'RESET_ACTIVE_SQUARE': {
      return {
        ...state,
        activeSquare: null
      };
    }
    case 'CHOSE_DIFFICULTY_LEVEL': {
      return {
        ...state,
        chosenLevel: action.payload,
      };
    }
   default:
      return state;
   }
}

export const userStepUpdate = (payload) => ({
  type: 'USER_STEP_UPDATE',
  payload: payload
})

export const updateStepsPartly = (payload) => ({
  type: 'UPDATE_STEPS_PART',
  payload: payload
})

export const changeTurn = () => ({
  type: 'TO_USERS_TURN',
  payload: 'player'
})

export const updateController = () => ({
  type: 'UPDATE_ELEMENT_INDEX',
  payload: -1,
})

export const lightElementUp = (id) => ({
  type: 'LIGHT_ELEMENT_UP',
  payload: id,
})

export const resetActiveSquare = () => ({
  type: 'RESET_ACTIVE_SQUARE',
})

export const choseDiffLevel = (payload) => ({
  type: 'CHOSE_DIFFICULTY_LEVEL',
  payload: payload
})

const store = createStore(reducer);

export default function configureStore() {
  return store;
};
