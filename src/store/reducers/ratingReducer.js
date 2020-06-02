import {
  ADDING_RATING_START,
  ADDING_RATING_SUCCESS,
  ADDING_RATING_FAIL,
  FETCHING_RATINGS_START,
  FETCHING_RATINGS_SUCCESS,
  FETCHING_RATINGS_FAIL,
  REMOVE_RATINGS_START,
  REMOVE_RATINGS_SUCCESS,
  REMOVE_RATINGS_FAIL,
} from "../actions/ratingAction";

const initialState = {
  movies: [],
  isAdding: false,
  isFetching: false,
  error: "",
};

export const rating = (state = initialState, action) => {
  switch (action.type) {
    // ADD RATING
    case ADDING_RATING_START:
      return {
        ...state,
        isAdding: true,
      };
    // ADD RATING SUCCESS
    case ADDING_RATING_SUCCESS:
      return {
        ...state,
        isAdding: false,
      };
    // ADD RATING FAIL
    case ADDING_RATING_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.payload,
      };
    // GET RATINGS
    case FETCHING_RATINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    // GET RATINGS SUCCESS
    case FETCHING_RATINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
      };
    // GET RATINGS FAIL
    case FETCHING_RATINGS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    // GET RATINGS
    case REMOVE_RATINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    // GET RATINGS SUCCESS
    case REMOVE_RATINGS_SUCCESS:
      return {
        ...state,
      };
    // GET RATINGS FAIL
    case REMOVE_RATINGS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
