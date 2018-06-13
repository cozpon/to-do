import { GET_TODOS, CREATE_TODO, TOGGLE_STATUS, DELETE_TODO } from '../actions/todos';

const initialState = [];

const todoList = (state = initialState, action) => {
  switch (action.type){                   // using a SWITCH CASE allows for different action.types to come in
    case GET_TODOS:                    // the GET_TODOS type comes in from ACTIONS folder toDos.js
      return [ ...action.items ];   // it tells us how to treat the case, and what to do with the data from the database
    case CREATE_TODO:
      return [ ...state, action.item ];
    case TOGGLE_STATUS:
      let index = state.findIndex((item) => {
        return item.id === action.item.id;
      });
      return [ ...(state.slice(0, index)), action.item, ...(state.slice((index + 1), state.length)) ]; //otherwise get duplicate
    case DELETE_TODO:
      let deleteRemoved = state.filter((item) => {
        return item.id !== action.item.id;
      });
      return [ ...deleteRemoved ];
    default:
      return state; // always have a default return state if action.type isn't recognized
  }
};

export default todoList;

