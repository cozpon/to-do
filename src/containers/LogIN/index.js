import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/users.js';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username : '',
      password : '',
      redirect : false, // set initial state to false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({
      redirect : true
    });
    let loginCreds = {
      username : this.state.username,
      password : this.state.password
    };

    this.props.loginUser(loginCreds);
    if(localStorage.error) {
      toast.error(`Oops! Wrong Password or Username, daddio!`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
    localStorage.clear();
  }

  handleUsernameInput(evt) {
    this.setState(
    {
      username : evt.target.value
    });
  }

  handlePasswordInput(evt) {
    this.setState(
    {
      password : evt.target.value
    });
  }

  render() {
    // loggedIn is a string so its basically checking if anything exists there
    if(this.props.singleUser.success && localStorage.userId) {
      return (
        <Redirect to={`/users/${localStorage.userId}`} />
      )
    }
    if(localStorage.error) {
      toast.error(`Oops! Wrong Password or Username, daddio!`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      localStorage.clear();
    }
    return(
      <div className="login-container">


        <ToastContainer />
        <div className="login-form">
          <div className="login-header">
            <h2>Login</h2>
          </div>
          <form className="inner-form-container" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-space">
            <input
              className="Input"
              name="username"
              type="text"
              placeholder="username"
              defaultValue={this.state.username}
              onChange={this.handleUsernameInput}/>
          </div>

            <div className="form-space">
            <input
              className="Input"
              name="password"
              type="password"
              placeholder="password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput}/>
            </div>
            <br/>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handleSubmit}>
              Login
            </button>
          </form>
          <div className="forgot-password">
          <Link to="/forgot">Forgot Password?</Link>
          </div>
        </div>
      </div>
    );
  }
}

// maps store state to local props
const mapStateToProps = (state) => {
  return {
    singleUser : state.singleUser
  };
};

//maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (loginCreds) => {
      dispatch(loginUser(loginCreds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);