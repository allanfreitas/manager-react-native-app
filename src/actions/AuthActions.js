import firebase from 'firebase';
import navigateTo from './navigateTo';
import * as ActionsTypes from './types';

export const emailChanged = (text) => ({
  type: ActionsTypes.EMAIL_CHANGED,
  payload: text
});

export const passwordChanged = (text) => ({
  type: ActionsTypes.PASSWORD_CHANGED,
  payload: text
});

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: ActionsTypes.LOGIN_USER_SUCCESS,
    payload: user
  });

  navigateTo(dispatch, 'EmployeeList', true);
};

const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: ActionsTypes.LOGOUT_USER_SUCCESS
  });

  navigateTo(dispatch, 'LoginForm', true);
};

export const listenToAuthStateChanged = () =>
  (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loginUserSuccess(dispatch, user);
      } else {
        logoutUserSuccess(dispatch);
      }
    });
  };

const loginUserFail = (dispatch) =>
  dispatch({
    type: ActionsTypes.LOGIN_USER_FAIL,
  });

const createAccount = (dispatch, email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)
      //.then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));

export const loginUser = ({ email, password }) =>
  (dispatch) => {
    dispatch({
      type: ActionsTypes.LOGIN_USER_START,
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
      //.then(user => loginUserSuccess(dispatch, user))
      .catch(() => createAccount(dispatch, email, password));
  };

export const logout = () =>
  () => {
    firebase.auth().signOut();
  };
