import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { loadTodos } from '../../actions/todos';

import TodoList from '../TodoList';
import NewTodoForm from '../NewTodoForm';

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
      toast.success(`Success! Email Changed!`,
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
  }
  componentWillMount(){
    setTimeout(function() {
      localStorage.removeItem('emailChange');
      localStorage.removeItem('passwordChange');
    }, 10);
  }

  render() {
    if( this.props.match && localStorage.userId === this.props.match.params.id ){
      return(
        <div className="user-view">
          <div id="user-welcome">
            Hello, { localStorage.username }!
          </div>
          <ToastContainer />
          <div className="Todo">
            <NewTodoForm />
              <h1>Things To-Do in the Futura</h1>
            <TodoList todos={this.props.todos} />
          </div>

          <div id="user-edit">
            want 2 edit ur profile, daddio? <br /> <br />
               <Link to={`/editpass/${localStorage.userId}`}>change ur Password</Link>
               <br />
               *-* or *-*
               <br />
               <Link to={`/editemail/${localStorage.userId}`}>change ur Email</Link>
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
const mapStateToProps = state => {
  return {
    singleUser : state.singleUser,
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
)(User);