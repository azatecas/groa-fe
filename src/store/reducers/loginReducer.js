import {
  FETCHING_USER_LOGIN_SUCCESS,
  FETCHING_USER_LOGIN_FAIL
} from "../actions/loginAction";

const initialState = {
  userid: "",
  error: ""
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    //LOGIN SUCCESS
    case FETCHING_USER_LOGIN_SUCCESS:
      return {
        ...state,
        userid: action.payload
      };

    //LOGIN FAIL
    case FETCHING_USER_LOGIN_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
