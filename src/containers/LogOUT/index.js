import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/users';

class Logout extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      redirect: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let logoutCreds = {
      username : '',
      password : ''
    };

    this.props.logoutUser(logoutCreds);

    this.setState(
    {
      username : '',
      password : '',
    });
    localStorage.clear();
  }

  // componentDidMount(){
  //   localStorage.clear();
  //   this.props.logoutUser();
  // }

  render(){
    if(!localStorage.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div id="logout-container">
        <center>
        <h2>See you later, alligator!</h2>
        </center>
        <form className="logout-form" onSubmit={this.handleSubmit.bind(this)}>

          <button
            className="register-btn"
            style={{width:'20%'}}
            type="submit"
            onClick={this.handleSubmit}>
            Log Me Out!
          </button>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);