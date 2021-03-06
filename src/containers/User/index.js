import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { loadTodos } from '../../actions/toDos';

import TodoList from '../TodoList';
import NewToDoForm from '../NewToDoForm';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      data: '',
      blur: false
    };
  }

  componentDidMount(){

    this.props.loadTodos();

    if( localStorage.emailChange ) {
      toast.success(`Success! Email Changed to "RickyRules@gmail.com" haha just kidding!`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    if( localStorage.passwordChange ) {
      toast.success(`Your password has been changed to '123password321' haha just kidding`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }

    setTimeout(function() {
      localStorage.removeItem('emailChange');
      localStorage.removeItem('passwordChange');
    }, 10);
  }

  render() {
    if( this.props.match && localStorage.userId === this.props.match.params.id ){
      return(
        <div className="user-view">
          <div className="user-welcome">
          <h2>
            Hello, { localStorage.username }!<br />
          </h2>
            <div id="user-edit">
              <Link to={`/editpass/${localStorage.userId}`}>Change your Password</Link>
              <br />
              - or -
              <br />
              <Link to={`/editemail/${localStorage.userId}`}>Change your Email</Link>
            </div>
          </div>
          <ToastContainer />
          <div className="Todo">
            <NewToDoForm />
            <center>
              <h1>Things To-Do in the Futura...</h1>
            </center>
            <TodoList todos={this.props.todos} />
          </div>
        </div>
      );
    }else{
        return(
          <div>Access Denied</div>
        );
      }
  }
}

// sets store state on local props
const mapStateToProps = state => ({
  singleUser : state.singleUser,
  todos : state.todoList // makes it this.props.ToDos
}); // Dan Abramov says if the arrow function only contains a single return statement (an object)
    // you can remove the return in place for parenthesis to make it an object expression

const mapDispatchToProps = dispatch => ({
  loadTodos() {
  // Dan says you can also remove the arrow function
  // to use the concise method notation in dispatchToProps
    dispatch(loadTodos());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);