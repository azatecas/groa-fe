import { FETCHING_USER_LOGIN_SUCCESS } from "./loginAction";
import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const FETCHING_USER_REGISTER_SUCCESS = "FETCHING_USER_REGISTER_SUCCESS";
export const FETCHING_USER_REGISTER_FAIL = "FETCHING_USER_REGISTER_FAIL";

// REGISTER
export function registerAction(userCreds, history) {
  let user = {
    user_name: userCreds.user_name,
    password: userCreds.password
  };
  return dispatch => {
    axiosWithAuth()
      .post("/register", userCreds)
      .then(res => {
        dispatch({ type: FETCHING_USER_REGISTER_SUCCESS });
        axiosWithAuth()
          .post("/login", user)
          .then(res => {
            console.log('this is the res', res);
            dispatch({
              type: FETCHING_USER_LOGIN_SUCCESS,
              payload: res.data.user_id
            });
            if(res.data.newUser === true){
            history.push(`/${res.data.user_id}/onboardingplatform`);
            }else {
              history.push(`/${res.data.user_id}/explore`);
            }
          }).catch(err => {
            console.log(err)
          });
      })
      .catch(err => {
        dispatch({
          type: FETCHING_USER_REGISTER_FAIL,
          payload: err
        });
      });
  };
}
