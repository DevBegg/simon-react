import { createStore, applyMiddleware } from 'redux';
import { getRandomSteps, isStepsEqual } from '../../helpers';

const initialState = {
  turn: '',
  stepsPart: [],
  userSteps: [],
  clickable: false,
  activeSquare: null,
  elementIndex: -1,
  stepsToReproduce: getRandomSteps(),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_STEP_UPDATE': {
      state.elementIndex ++;
      state.userSteps = [...state.userSteps, action.payload];
      let nextTurn = isStepsEqual(state.stepsPart, state.elementIndex, state.userSteps);
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
        elementIndex: action.payload
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

const store = createStore(reducer);

export default function configureStore() {
  return store;
};
