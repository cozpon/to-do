import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editEmail } from '../../actions/users';

class EditEmail extends Component {
  constructor() {
    super();

    this.state = {
      id : '',
      email : '',
      oldpassword : '',
      redirect : false // set initial state to false
    };
    this.handleOldPasswordInput = this.handleOldPasswordInput.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
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
      oldpassword : this.state.oldpassword,
      id : this.props.match.params.id
    };
    this.props.editEmail(newEmail);
    this.setState({
      email : '',
      oldpassword : ''
    });
  }

  handleEmailInput(evt) {
    this.setState(
    {
      email : evt.target.value,
    });
  }

  componentDidMount() {
    localStorage.removeItem('emailChange');
  }

  render() {
    if( localStorage.emailChange ) {
      return (
      <Redirect to={`/users/${localStorage.userId}`} />
      )
    }
    if( localStorage.userId === this.props.match.params.id ){
      return(
      <div className="login-container">

      <div className="login-form">
        <div className="form-header">
          <h2>Change Email Address</h2>
        </div>
        <div className="password-change">
          <center>
            So u want 2 change ur email addy
          </center>
        </div>
        <div className="form-space">
        </div>
        <form className="inner-form-container" onSubmit={this.handleEmailChange.bind(this)}>
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
              name="email"
              type="text"
              placeholder="enter new email addy"
              defaultValue={this.state.email}
              onChange={this.handleEmailInput} />
          </div>
        <div className="form-space">
        </div>
          <div>
            <input
              className="Input"
              name="email"
              type="text"
              placeholder="re-enter new email addy"
              defaultValue={this.state.email}
              onChange={this.handleEmailInput} />
          </div>
            <button
              className="password-btn"
              type="submit"
              onClick={this.handleEmailChange}>
              Change Ur Email
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
    editEmail: (editUserConfirm) => {
      dispatch(editEmail(editUserConfirm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmail);