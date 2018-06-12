import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todos';

//import Select from '../../components/Select';

class NewTodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: '',
      description: '',
      is_done: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
  }

  handleSubmit(evt){
    evt.preventDefault();
    if (this.state.description) { // Don't allow empty submissions
      let newTodo = {
        description: this.state.description,  // when the client inserts/changes the description, it sets the state here
        is_done: 1,
        user_id: localStorage.userId
      };
    this.props.addTodo(newTodo);
   }

    this.setState({
      description: '',
      is_done: 1,
      user_id: ''
    });
  }

  handleDescriptionInput(evt) {
    this.setState({             // setting the state of the title to be the value input from below
      description: (evt.target.value)
    });
  }

  render() {
    return (
      <div className="new-card-form">
        <form className="SubmitButton" onSubmit={this.handleSubmit}>
          <div className="input-form">
            <input
              value={this.state.description}
              className="Todo-Input"
              type="text"
              placeholder="To-Do in the Futura..."
              onChange={this.handleDescriptionInput}
            />
          </div>
          <input
            className="new-todo-btn"
            type="submit"
            value="Submit Item"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoList  // setting state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (item) => {
      dispatch(addTodo(item))
    }
  }
}

const ConnectedNewTodoForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTodoForm)

export default ConnectedNewTodoForm;

