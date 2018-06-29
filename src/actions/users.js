import Axios from 'axios';

import { url } from '../lib/url';

const register = `${url}auth/register`;
const login = `${url}auth/login`;
const logout = `${url}auth/logout`;
const forgot = `${url}auth/forgot`;
const reset = `${url}auth/reset`;
const editpass = `${url}auth/editpass`;
const editemail = `${url}auth/editemail`;

export const registerUser = (registerCreds) => {
  return (dispatch) => {
    return Axios.post(register, registerCreds)
    .then(response => {
        dispatch({
          type: 'REGISTER_USER',
          response: response.data
       });
    })
    .catch(err => {
      dispatch({
        type: 'ERROR',
        error: err
      });
    });
  };
};

export const loginUser = (userCreds) => {
  return (dispatch) => {
    return Axios.post(login, userCreds)
    .then((response) => {
      dispatch({
        type: 'LOGIN_USER',
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        error: 'invalid user name or password'
      });
    });
  };
};

export const loadUser = (id) => {
  return function(dispatch) {
    return Axios.get(`${url}users/${id}`).then((user) => {
      dispatch({
        type: 'LOAD_USER',
        user: user.data
      });
    });
  };
};

export const forgotPassword = (userEmail) => {
  return (dispatch) => {
    return Axios.post(forgot, userEmail)
    .then((response) => {
      dispatch({
        type: 'FORGOT_PASS',
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        error: 'something went wrong, please try again!'
      });
    });
  };
};


export const resetPassword = (password) => {
  return (dispatch) => {
    return Axios.put(`${reset}/${password.token}`, password)
    .then((response) => {
      dispatch({
        type: 'RESET_PASS',
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ERROR',
        error: 'something went wrong, please try again!'
      });
    });
  };
};


export const editPassword = (user) => {
  return (dispatch) => {
    return Axios.put(`${editpass}/${user}`, user)
    .then((editedUser) => {
      dispatch({
        type: 'EDIT_PASSWORD',
        user: editedUser.data
      });
    });
  };
};

export const editEmail = (user) => {
  return (dispatch) => {
    return Axios.put(`${editemail}/${user}`, user)
    .then((editedUser) => {
      dispatch({
        type: 'EDIT_EMAIL',
        user: editedUser.data
      });
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    return Axios.get(logout)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: 'LOGOUT_USER',
          success: response.data.success
        });
      }
    })
    .catch((err) => {
      console.log('Logout Failed. Please try again', err);
      return false;
    });
  };
};
