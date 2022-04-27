import {
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
  SIGNUP_FAIL_ACTION,
  LAODING_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_FAILED_ACTION,
  LOGOUT_ACTION,
} from "../actions/AuthActions";

const initialState = {
  auth: {
    email: "",
    idToken: "",
    localId: "",
    expiresIn: "",
    refreshToken: "",
  },
  errorMsg: "",
  sucessMsg: "",
  showLoading: false,
};

export function AuthReducer(state = initialState, action) {
  console.log("reduce is called");
  if (action.type === LAODING_ACTION) {
    return { ...state, showLoading: action.payload };
  }
  if (action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMsg: "",
      sucessMsg: "Sing Up successfully comppleted",
      // showLoading: false,
    };
  }

  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMsg: "",
      sucessMsg: "Login successfully comppleted",
      // showLoading: false,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    return {
      ...state,
      auth: {
        email: "",
        idToken: "",
        localId: "",
        expiresIn: "",
        refreshToken: "",
      },
      sucessMsg: "",
      // showLoading: false,
    };
  }
  if (
    action.type === SIGNUP_FAILED_ACTION ||
    action.type === LOGIN_FAILED_ACTION
  ) {
    return {
      ...state,
      errorMsg: action.payload,
      sucessMsg: "",
      //   showLoading: false,
    };
  }
  return state;
}
