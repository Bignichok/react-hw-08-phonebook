import { authAPI, token } from "../api/api";

const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_ERROR = "LOGOUT_ERROR";

const signupRequest = () => ({ type: SIGNUP_REQUEST });

const signupSuccess = (user, token) => ({
  type: SIGNUP_SUCCESS,
  payload: {
    name: user.name,
    email: user.email,
    token,
  },
});

const signupError = (error) => ({
  type: SIGNUP_ERROR,
  payload: {
    error,
  },
});

const loginRequest = () => ({ type: LOGIN_REQUEST });

const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: {
    name: user.name,
    email: user.email,
    token,
  },
});

const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: {
    error,
  },
});

const logoutRequest = () => ({ type: LOGOUT_REQUEST });

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: {},
});

const logoutError = (error) => ({
  type: LOGOUT_ERROR,
  payload: {
    error,
  },
});

export const signUp = (name, email, password) => (dispatch) => {
  dispatch(signupRequest());
  authAPI
    .createNewUser(name, email, password)
    .then((resp) => {
      console.log(resp);

      dispatch(signupSuccess(resp.user, resp.token));
      token.set(resp.token);
      return resp;
    })
    .catch((error) => dispatch(signupError(error)))
    .finally(() => {});
};

export const login = (email, password) => (dispatch) => {
  dispatch(loginRequest());
  authAPI
    .login(email, password)
    .then((resp) => {
      console.log(resp);
      console.log(resp.user);
      dispatch(loginSuccess(resp.user, resp.token));
      token.set(resp.token);
      return resp;
    })
    .catch((error) => dispatch(loginError(error)))
    .finally(() => {});
};

export const logout = () => (dispatch) => {
  dispatch(logoutRequest());
  authAPI
    .logout()
    .then((resp) => {
      console.log(resp);
      token.unset();
      dispatch(logoutSuccess());
      return resp;
    })
    .catch((error) => dispatch(logoutError(error)))
    .finally(() => {});
};

const initialState = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  error: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: {
          name: payload.name,
          email: payload.email,
        },
        token: payload.token,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case LOGIN_SUCCESS:
      console.log(payload);
      return {
        ...state,
        user: {
          name: payload.name,
          email: payload.email,
        },
        token: payload.token,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    case LOGOUT_ERROR:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};
export default authReducer;
