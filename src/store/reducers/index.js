import { combineReducers } from "redux";
import { login } from './loginReducer';
import { rating } from './ratingReducer';
import { register } from './registerReducer';
import { recommendations } from './recommendationReducer';
import { upload } from './uploadReducer';
import { filter } from './filterReducer';
import { watchlist } from './watchlistReducer';
import { movie } from './movieReducer';
import { notwatchlist } from './notWatchListReducer';
import { serviceProvider } from './serviceProviderReducer';
import { search } from "./searchReducer";
import { landingPageReducer } from './landingPageReducer';

export const reducer = combineReducers({
  login,
  rating,
  register,
  recommendations,
  upload,
  movie,
  filter,
  watchlist,
  search,
  notwatchlist,
  serviceProvider,
  landingPageReducer
});


