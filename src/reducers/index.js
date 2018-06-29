import { combineReducers } from 'redux';
// using combineReducers to allow more than one REDUCER to be used cleanly
// I separated my reducer files in case I want to expand this project.
import singleUser from './user';
import todoList from './todoList';

export default combineReducers({
  todoList,
  singleUser
});