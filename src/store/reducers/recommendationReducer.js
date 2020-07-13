import {
  FETCHING_RECOMMENDATIONS_START,
  FETCHING_RECOMMENDATIONS_SUCCESS,
  FETCHING_RECOMMENDATIONS_FAIL,
} from "../actions/recommendationActions";

import { NOTWATCHLIST_REMOVE } from "../actions/notWatchListAction";

const initialState = {
  isFetching: false,
  movies: [],
  error: "",
};

export const recommendations = (state = initialState, action) => {
  switch (action.type) {
    //REMOVES NOT INTERESTED MOVIE FROM STATE
    case NOTWATCHLIST_REMOVE:
      let myMovie = action.payload;
      let newMovies = state.movies.filter(
        (el) => el.movie_id !== myMovie.movie_id
      );
      return {
        ...state,
        movies: [...newMovies],
      };
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
