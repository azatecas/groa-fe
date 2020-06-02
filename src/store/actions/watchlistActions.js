import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const ADDING_WATCHLIST_START = "ADDING_WATCHLIST_START";
export const ADDING_WATCHLIST_SUCCESS = "ADDING_WATCHLIST_SUCCESS";
export const ADDING_WATCHLIST_FAIL = "ADDING_WATCHLIST_FAIL";

export const FETCHING_WATCHLIST_START = "FETCHING_WATCHLIST_START";
export const FETCHING_WATCHLIST_SUCCESS = "FETCHING_WATCHLIST_SUCCESS";
export const FETCHING_WATCHLIST_FAIL = "FETCHING_WATCHLIST_FAIL";

export const REMOVEFROMWATCHLIST_START = 'REMOVEFROMWATCHLIST_START';
export const REMOVEFROMWATCHLIST_SUCCESS = 'REMOVEFROMWATCHLIST_SUCCESS';
export const REMOVEFROMWATCHLIST_FAIL = 'REMOVEFROMWATCHLIST_FAIL';

// ADD TO WATCHLIST
export function addToWatchlistAction(id, movie, token) {
  return dispatch => {
    dispatch({
      type: ADDING_WATCHLIST_START
    });
    axiosWithAuth(token)
      .post(`/${id}/add-to-watchlist`, movie)
      .then(res => {
        dispatch({
          type: ADDING_WATCHLIST_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADDING_WATCHLIST_FAIL,
          payload: err
        });
      });
  };
}
// GET WATCHLIST
export function getWatchlistAction(id, token) {
  return dispatch => {
    dispatch({
      type: FETCHING_WATCHLIST_START
    });
    axiosWithAuth(token)
      .get(`/${id}/get-watchlist`)
      .then(res => {
        dispatch({
          type: FETCHING_WATCHLIST_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: FETCHING_WATCHLIST_FAIL,
          payload: err
        });
      });
  };
}
// POST REMOVEFROMWATCHLIST
export function removeWatchListAction(id, movie_id, token) {
  console.log('mvie id', movie_id)
  return (dispatch) => {
    dispatch({
      type: REMOVEFROMWATCHLIST_START,
    });
    axiosWithAuth(token)
      .post(`/watchlist/${id}/remove/${movie_id}`)
      .then(res => {
        dispatch({
          type: REMOVEFROMWATCHLIST_SUCCESS,
          payload: res.data,
        });
        axiosWithAuth(token)
          .get(`/${id}/get-watchlist`)
          .then(res => {
            dispatch({
              type: FETCHING_WATCHLIST_SUCCESS,
              payload: res.data
            });
          })
      })
      .catch(err => {
        dispatch({
          type: REMOVEFROMWATCHLIST_FAIL,
          payload: err
        })
      })
  }
}
