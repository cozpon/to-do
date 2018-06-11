import React, { Component } from 'react';
import Todo from '../../components/Todo';
import { connect } from 'react-redux';
import { loadTodos, toggleStatus } from '../../actions/todos';

class TodoList extends Component {
  constructor(props){
    super(props);
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
      id: evt.target.id
    });
  }

  render() {
    return (
      <div className="todo-list">
        <form onClick={this.handleStatusChange} onSubmit={this.handleSubmit}>
        {
          this.props.todos
            .map((todo) => {
              return (
                <Todo
                  description={todo.description}
                  status={todo.Status.done}
                  creator={todo.creator}
                  key={todo.id}
                  id={todo.id}
                />
              );
          })
        }
         </form>
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
    },
    toggleStatus: (item) => {
      dispatch(toggleStatus(item));
    }
  }
}


const ConnectedTodo = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)


export default ConnectedTodo;

