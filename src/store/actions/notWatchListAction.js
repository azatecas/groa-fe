import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const ADDING_NOTWATCHLIST_START = "ADDING_NOTWATCHLIST_START";
export const ADDING_NOTWATCHLIST_SUCCESS =
  "ADDING_NOTWATCHLIST_SUCCESS";
export const ADDING_NOTWATCHLIST_FAIL = "ADDING_NOTWATCHLIST_FAIL";

export function notWatchListAction(id, movie, token) {
    return(dispatch) => {
        dispatch({
            type: ADDING_NOTWATCHLIST_START,
        });
        axiosWithAuth(token)
        .post(`/${id}/notwatchlist`, movie)
        .then((res) => {
            console.log('this is the res of notwatchlist', res)
            dispatch({
                type: ADDING_NOTWATCHLIST_SUCCESS,
                payload:res.data,
            });
        })
        .catch((err) => {
            console.log("ERROR:", err);
            dispatch({
                type: ADDING_NOTWATCHLIST_FAIL,
                payload: err
            })
        })
    }
}
