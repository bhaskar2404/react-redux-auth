import axios from "axios";
import {
  loginConfirmedAction,
  LOGIN_CONFIRMED_ACTION,
  logoutAction,
  logoutConfirmed,
} from "../store/actions/AuthActions";

export const signUp = (email, password) => {
  const postdata = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9MITnh9idLz7J3llwqKot-3CmWnqaYwE`,
    postdata
  );
};

export const login = (email, password) => {
  const postdata = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9MITnh9idLz7J3llwqKot-3CmWnqaYwE`,
    postdata
  );
};

export const saveTokenDataInLocalStorage = (tokenDetails) => {
  tokenDetails.expireDate = new Date(
    new Date().getTime() + tokenDetails.expiresIn * 1000
  );
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
};

export const remvoeTokenFromLocalStorage = () => {
  localStorage.removeItem("userDetails");
};

export const runLogoutTimer = (dispatch, timer, history) => {
  setTimeout(() => {
    dispatch(logoutConfirmed(history));
  }, timer);
};

export const checkAutoLogin = (dispatch, history) => {
  const tokenDetailsString = localStorage.getItem("userDetails");
  if (!tokenDetailsString) {
    dispatch(logoutConfirmed(history));
    return;
  }

  let tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(logoutConfirmed(history));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));
  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, history);
};
