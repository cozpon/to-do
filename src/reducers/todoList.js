import { GET_TODOS, CREATE_TODO, TOGGLE_STATUS } from '../actions/toDos';

const initialState = {  // our data is coming in as an array,
  toDos: [],
  // inProgress: []
};

const toDosList = (state = initialState, action) => {
  switch (action.type){                   // using a SWITCH CASE allows for different action.types to come in
    case GET_TODOS:                     // the GET_TODOS type comes in from ACTIONS folder toDos.js
      return Object.assign({}, state, {   // it tells us how to treat the case, and what to do with the data from the database
        toDos : [...action.toDos]
      });
    case CREATE_TODO:
      return Object.assign({}, state, { // Object.assign({}, state) etc. This is using the SPREAD operator to insert our
        toDos : [...state.toDos, action.toDos]  // newly created card into the toDos STATE array.
      });

    case TOGGLE_STATUS:
      return Object.assign({}, state, {
        toDos : [...state.toDos, action.toDos]       // was thinking this could be used to filter STATUS for toDos later
      });

    default:
      return state; // always have a default return state if action.type isn't recognized
  }
};

export default toDosList;

