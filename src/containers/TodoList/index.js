import React, { Component } from 'react';
import Todo from '../../components/Todo';
import { connect } from 'react-redux';
import { loadTodos } from '../../actions/todos';

class TodoList extends Component {

  render() {
    return (
      <div className="todo-list">
        {
          this.props.todos
          .map((todo) => {
            return (
              <Todo
                description={todo.description}
                status={todo.done}
                creator={todo.creator}
                key={todo.id}
                id={todo.id}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoList // putting cards onto the Prop component
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTodos: () => {
      dispatch(loadTodos()) // using Dispatch to get cards into Props.
    }
  }
}


const ConnectedTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)


export default ConnectedTodo;

