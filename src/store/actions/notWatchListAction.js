import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const ADDING_NOTWATCHLIST_START = "ADDING_NOTWATCHLIST_START";
export const ADDING_NOTWATCHLIST_SUCCESS = "ADDING_NOTWATCHLIST_SUCCESS";
export const ADDING_NOTWATCHLIST_FAIL = "ADDING_NOTWATCHLIST_FAIL";
export const NOTWATCHLIST_REMOVE = "NOTWATCHLIST_REMOVE";

export function notWatchListAction(id, movie, token) {
  return (dispatch) => {
    dispatch({
      type: ADDING_NOTWATCHLIST_START,
    });
    axiosWithAuth(token)
      .post(`/${id}/notwatchlist`, movie)
      .then((res) => {
        console.log("this is the res of notwatchlist", res);
        dispatch({
          type: ADDING_NOTWATCHLIST_SUCCESS,
          payload: res.data,
        });

        //action for removing notinterested movie from state
        dispatch({
          type: NOTWATCHLIST_REMOVE,
          payload: movie,
        });
      })
      .catch((err) => {
        console.log("ERROR:", err);
        dispatch({
          type: ADDING_NOTWATCHLIST_FAIL,
          payload: err,
        });
      });
  };
}
