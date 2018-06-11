import Axios from 'axios';
import { url } from '../lib/url';

export const ERROR = 'ERROR';
export const GET_TODOS = 'GET_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const TOGGLE_STATUS = 'TOGGLE_STATUS';


export const loadTodos = () => { // creating a GET action that calls onto the GET XHR request
  return (dispatch) => {
    return Axios.get(`${url}todo`)
    .then(items => {
      console.log(items.data, "ACTIONS");
      dispatch({
        type: GET_TODOS,
        items: items.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const addTodo = (newItem) => { // using the POST XHR request in the 'lib' folder
  return (dispatch) => {
    return Axios.post(`${url}todo`, newItem)
    .then(item => {
      dispatch({
        type: CREATE_TODO, // dispatch is for activating a function call before returning an object
        item: item.data // always always have to include "type" and then a state or some kind of change
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const toggleStatus = (item) => {
  console.log(item);
  return (dispatch) => {
    return Axios.put(`${url}todo/${item}`, item)
    .then(edited => {
      console.log(edited, "DATA)#@#");
      dispatch({
        type: TOGGLE_STATUS,
        item: edited.data
      });
    });
  };
};

// export const toggleStatus = (id, status) => {
//   return function(dispatch){
//     return changeStatus(id).then(card => {
//       dispatch({
//         type: TOGGLE_STATUS,
//         id : card.id,
//         status : card.status
//       });
//     });
//   };
// };
