import {
  FETCHING_MOVIES_START,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAIL,
} from "../actions/movieAction";

const initialState = {
  movies: [],
  isFetching: false,
  error: "",
  search: false,
};

export const movie = (state = initialState, action) => {
  switch (action.type) {
    // GET MOVIES
    case FETCHING_MOVIES_START:
      return {
        ...state,
        isFetching: true,
        search: true,
      };
    // GET MOVIES SUCCESS
    case FETCHING_MOVIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
      };
    // GET MOVIES FAIL
    case FETCHING_MOVIES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
