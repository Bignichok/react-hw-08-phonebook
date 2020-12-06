import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  GET_CURRENT_USER_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  GET_CURRENT_USER_ERROR,
} from "./authReducer";

const initialState = {
  loggedIn: false,
};

const loggedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case SIGNUP_ERROR:
    case LOGIN_ERROR:
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default loggedInReducer;
