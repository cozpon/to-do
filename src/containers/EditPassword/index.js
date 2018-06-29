import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editPassword } from '../../actions/users';
import { editEmail } from '../../actions/users';
// import { ToastContainer, toast } from "react-toastify";

class EditPassword extends Component {
  constructor() {
    super();

    this.state = {
      id : '',
      email : '',
      password : '',
      password2 : '',
      oldpassword : '',
      redirect : false // set initial state to false
    };
    this.handleOldPasswordInput = this.handleOldPasswordInput.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleReEnterPasswordInput = this.handleReEnterPasswordInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handlePasswordChange(evt) {
    evt.preventDefault();
    let newPassword = {
      oldpassword : this.state.oldpassword,
      password : this.state.password2,
      id : this.props.match.params.id
    };
    this.props.editPassword(newPassword);
    this.setState({
      password2: '',
      password : '',
      oldpassword : '',
      redirect : true
    });
  }

  handlePasswordInput(evt) {
    this.setState(
    {
      password : evt.target.value,
    });
  }
  handleReEnterPasswordInput(evt) {
    if(this.state.password === evt.target.value){
      this.setState(
      {
        password2 : evt.target.value,
      });
    }
  }

  handleOldPasswordInput(evt) {
    this.setState(
    {
      oldpassword : evt.target.value,
    });
  }

  handleEmailChange(evt) {
    evt.preventDefault();
    let newEmail = {
      email : this.state.email,
    };
    this.props.editEmail(newEmail);
    this.setState({
      email : '',
    });
  }

  handleEmailInput(evt) {
    this.setState(
    {
      email : evt.target.value,
    });
  }

  render() {
    if( localStorage.passwordChange ) {
      return (
      <Redirect to={`/users/${localStorage.userId}`} />
      )
    }
    if( localStorage.userId === this.props.match.params.id ){
      return(
      <div className="login-container">


      <div className="login-form">
        <div className="login-header">
          <h2>Change Password</h2>
        </div>
        <div className="password-change">
          <center>
            So u want 2 change ur password
          </center>
        </div>
        <div className="form-space">
        </div>
          <form className="inner-form-container" onSubmit={this.handlePasswordChange.bind(this)}>
            <input
              className="Input"
              name="oldpassword"
              type="password"
              placeholder="current password"
              defaultValue={this.state.oldpassword}
              onChange={this.handleOldPasswordInput} />
            <div className="form-space">
            </div>
          <div>
            <input
              className="Input"
              name="password"
              type="password"
              placeholder="enter new password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput} />
          </div>
          <div className="form-space">
          </div>
          <div>
            <input
              className="Input"
              name="reenterpassword"
              type="password"
              placeholder="re-enter new password"
              defaultValue={this.state.password2}
              onChange={this.handleReEnterPasswordInput} />
          </div>
            <button
              className="password-btn"
              type="submit"
              onClick={this.handlePasswordChange}>
              Change Ur Password
            </button>
          </form>
        </div>
      </div>
    );
    } else {
      return(
        <div>Access Denied</div>
      );
    }
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
    editPassword: (editUserConfirm) => {
      dispatch(editPassword(editUserConfirm));
    },
    editEmail: (editUserConfirm) => {
      dispatch(editEmail(editUserConfirm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPassword);