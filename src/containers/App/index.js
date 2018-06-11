import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { loadCards } from '../../actions/cards';
// import { getPriorities } from '../../actions/priorities';
import { loadTodos } from '../../actions/todos';

import TodoList from '../TodoList';
import NewTodoForm from '../NewTodoForm';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      todos: [],
    };
  }
  // shouldComponentUpdate(){
  //  this.props.loadTodos();
  // }

  componentDidMount(){
   this.props.loadTodos();
  }

  //A container does data fetching and then renders its corresponding sub-component.

  render() {
    return (
      <div className="App">
        <NewTodoForm />
        <h1>Things To-Do in the Futura</h1>
          <TodoList todos={this.props.todos} />
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
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);