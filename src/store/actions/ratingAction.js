import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const ADDING_RATING_START = "ADDING_RATING_START";
export const ADDING_RATING_SUCCESS = "ADDING_RATING_SUCCESS";
export const ADDING_RATING_FAIL = "ADDING_RATING_FAIL";
export const FETCHING_RATINGS_START = "FETCHING_RATINGS_START";
export const FETCHING_RATINGS_SUCCESS = "FETCHING_RATINGS_SUCCESS";
export const FETCHING_RATINGS_FAIL = "FETCHING_RATINGS_FAIL";
export const REMOVE_RATINGS_START = "REMOVE_RATINGS_START";
export const REMOVE_RATINGS_SUCCESS = "REMOVE_RATINGS_SUCCESS";
export const REMOVE_RATINGS_FAIL = "REMOVE_RATINGS_FAIL";

// RATINGS
export function ratingAction(id, rating, token) {
  return (dispatch) => {
    dispatch({
      type: ADDING_RATING_START,
    });
    axiosWithAuth(token)
      .post(`/${id}/add-movie-rating`, rating)
      .then((res) => {
        dispatch({
          type: ADDING_RATING_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        dispatch({
          type: ADDING_RATING_FAIL,
          payload: err,
        });
      });
  };
}

//GET RATINGS
export function getRatingAction(id, token) {
  return (dispatch) => {
    dispatch({
      type: FETCHING_RATINGS_START,
    });
    axiosWithAuth(token)
      .get(`/${id}/get-ratings`)
      .then((res) => {
        dispatch({
          type: FETCHING_RATINGS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCHING_RATINGS_FAIL,
          payload: err,
        });
      });
  };
}

export function removeRatingAction(id, removedRating, token) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_RATINGS_START,
    });
    console.log("this is the removed movie: ", removedRating);
    axiosWithAuth(token)
      .post(`/${id}/remove-rating`, removedRating)
      .then((res) => {
        dispatch({
          type: REMOVE_RATINGS_SUCCESS,
          payload: res.data,
        });
        axiosWithAuth(token)
          .get(`/${id}/get-ratings`)
          .then((res) => {
            dispatch({
              type: FETCHING_RATINGS_SUCCESS,
              payload: res.data,
            });
          })
          .catch((err) => {
            dispatch({
              type: FETCHING_RATINGS_FAIL,
              payload: err,
            });
          });
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        dispatch({
          type: REMOVE_RATINGS_FAIL,
          payload: err,
        });
      });
  };
}
