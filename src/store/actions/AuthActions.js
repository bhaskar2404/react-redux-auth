import {
  login,
  remvoeTokenFromLocalStorage,
  runLogoutTimer,
  saveTokenDataInLocalStorage,
  signUp,
  signup,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LAODING_ACTION = "BEGIN TRANSACTON";
export const LOGIN_CONFIRMED_ACTION = "[Login action] confirmed signup";
export const LOGIN_FAILED_ACTION = "[Login action] failed signup";
export const LOGOUT_ACTION = "Logout Action";

export function signupAction(email, password, history) {
  return (dispatch) => {
    dispatch(beginStransaction(true));
    signUp(email, password)
      .then((response) => {
        saveTokenDataInLocalStorage(response.data);
        dispatch(beginStransaction(false));
        dispatch(confirmedSignupAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        const errorMsg = formatError(error.response.data);
        dispatch(beginStransaction(false));
        dispatch(singupFailedAction(errorMsg));
      });
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    dispatch(beginStransaction(true));
    login(email, password)
      .then((response) => {
        dispatch(beginStransaction(false));
        saveTokenDataInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(loginConfirmedAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        const errorMsg = formatError(error.response.data);
        dispatch(beginStransaction(false));
        dispatch(loginFailedAction(errorMsg));
      });
  };
}

export const logoutConfirmed = (history) => {
  return (dispatch) => {
    dispatch(beginStransaction(true));
    remvoeTokenFromLocalStorage();
    dispatch(logoutAction());
    dispatch(beginStransaction(false));
    history.push("login");
  };
};
export const logoutAction = () => {
  return { type: LOGOUT_ACTION };
};
export function singupFailedAction(message) {
  return { type: SIGNUP_FAILED_ACTION, payload: message };
}

export function loginFailedAction(message) {
  return { type: LOGIN_FAILED_ACTION, payload: message };
}
export function loginConfirmedAction(data) {
  return { type: LOGIN_CONFIRMED_ACTION, payload: data };
}
export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      return "Email already exist";
    case "EMAIL_NOT_FOUND":
      return "Email not found";
    case "USER_DISABLED":
      return "User is disabled";
    case "INVALID_PASSWORD":
      return "Invalid password";
    default:
      return "";
  }
}

export function beginStransaction(status) {
  return { type: LAODING_ACTION, payload: status };
}
