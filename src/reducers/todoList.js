import { GET_TODOS, CREATE_TODO, TOGGLE_STATUS } from '../actions/todos';

const initialState = [];

const todoList = (state = initialState, action) => {
  switch (action.type){                   // using a SWITCH CASE allows for different action.types to come in
    case GET_TODOS:
    console.log(action.items);                     // the GET_TODOS type comes in from ACTIONS folder toDos.js
      return [ ...action.items ];   // it tells us how to treat the case, and what to do with the data from the database
    case CREATE_TODO:
      return [ ...state, action.item ];
    case TOGGLE_STATUS:
      return [...state.item, action.item];      // was thinking this could be used to filter STATUS for toDos later

    default:
      return state; // always have a default return state if action.type isn't recognized
  }
};

export default todoList;

