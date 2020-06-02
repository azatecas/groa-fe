import axiosWithAuth from "../../utils/axiosWithAuth.js";
export const START_SEARCH_START = "START_SEARCH_START";
export const START_SEARCH_SUCCESS = "START_SEARCH_SUCCESS";
export const START_SEARCH_FAIL = "START_SEARCH_FAIL";
export const EMPTY_SEARCH = "EMPTY_SEARCH";

export function searchAction(id, query, token) {
  if (query.query === "") {
    return (dispatch) => {
      dispatch({
        type: EMPTY_SEARCH,
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: START_SEARCH_START,
      });
      axiosWithAuth(token)
        .post(`/${id}/search`, query)
        .then((res) => {
          dispatch({
            type: START_SEARCH_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
          dispatch({
            type: START_SEARCH_FAIL,
            payload: err,
          });
        });
    };
  }
}
