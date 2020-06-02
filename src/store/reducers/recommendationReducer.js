import {
  FETCHING_RECOMMENDATIONS_START,
  FETCHING_RECOMMENDATIONS_SUCCESS,
  FETCHING_RECOMMENDATIONS_FAIL,
} from "../actions/recommendationActions";

const initialState = {
  isFetching: false,
  movies: [],
  error: "",
};

export const recommendations = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_RECOMMENDATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    //RECOMMENDATIONS SUCCESS
    case FETCHING_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movies: action.payload,
      };

    //RECOMMENDATIONS FAIL
    case FETCHING_RECOMMENDATIONS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
