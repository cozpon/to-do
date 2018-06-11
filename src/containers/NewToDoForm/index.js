import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToDo } from '../../actions/toDos';

//import Select from '../../components/Select';

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      is_done: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
  }

  handleSubmit(evt){
    console.log(evt, 'handleSubmit');
    evt.preventDefault();

    let newToDo = {
      description: this.state.description,  // when the client inserts/changes the description, it sets the state here
      is_done: 1,
      user_id: localStorage.userId
    };
     console.log(newToDo, "New Card");

    this.props.addToDo(newToDo);

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
        <form onSubmit={this.handleSubmit}>
          <div className="input-form">
            <input value={this.state.description} type="text" placeholder="To-Do in the Futura..." onChange={this.handleDescriptionInput}/>
          </div>
          <input type="submit" value="Submit Item"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // priorities: state.prioritiesList,     // setting state
    // users: state.usersList,
    // cards: state.cardsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (item) => {
      dispatch(addToDo(item))
    }
  }
}

const ConnectedNewCardForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCardForm)

export default ConnectedNewCardForm;

