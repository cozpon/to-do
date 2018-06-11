import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { loadCards } from '../../actions/cards';
// import { getPriorities } from '../../actions/priorities';
import { loadTodos, toggleStatus } from '../../actions/todos';

import TodoList from '../TodoList';
import NewTodoForm from '../NewTodoForm';

class App extends Component{
  constructor(){
    super();
    this.state = {
      todos: [],
      is_done: '',
      id: ''
    };
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let statusChange = {
      is_done: this.state.is_done,
      id: this.state.id
    };

    this.setState({
      is_done: '',
      id: ''
    });

    this.props.toggleStatus(statusChange);
  }

  handleStatusChange(evt) {
    this.setState({
      is_done: 2,
      id: evt.target.value
    });
  }

  componentDidMount(){
   this.props.loadTodos();
  }

  //A container does data fetching and then renders its corresponding sub-component.

  render() {
    return (
      <div className="App">
        <NewTodoForm />
        <h1>Things To-Do in the Futura</h1>
        <form onClick={this.handleStatusChange} onSubmit={this.handleSubmit}>
          <TodoList todos={this.props.todos}/>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    todos : state.todoList // makes it this.props.ToDos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => {
      dispatch(loadTodos());
    },
    toggleStatus: (item) => {
      console.log(item);
      dispatch(toggleStatus(item));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);