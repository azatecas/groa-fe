import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const FETCHING_MOVIES_START = "FETCHING_MOVIES_START";
export const FETCHING_MOVIES_SUCCESS = "FETCHING_MOVIES_SUCCESS";
export const FETCHING_MOVIES_FAIL = "FETCHING_MOVIES_FAIL";
//GET MOVIES
export function getMoviesAction(id, token) {
    return dispatch => {
      dispatch({
        type: FETCHING_MOVIES_START
      });
      axiosWithAuth(token)
        .get(`/${id}/get-movies`)
        .then(res => {
          dispatch({
            type: FETCHING_MOVIES_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => {
          console.log("ERROR: ", err);
          dispatch({
            type: FETCHING_MOVIES_FAIL,
            payload: err
          });
        });
    };
  }