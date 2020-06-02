import { loginAction } from "./loginAction.js";
import {
  ratingAction,
  getRatingAction,
  removeRatingAction,
} from "./ratingAction.js";
import { registerAction } from "./registerAction.js";
import { recommendationAction } from "./recommendationActions.js";
import { uploadAction, toggleIsUploaded } from "./uploadAction.js";
import {
  addToWatchlistAction,
  getWatchlistAction,
} from "./watchlistActions.js";
import { getMoviesAction } from "./movieAction";
import { setFilter } from "./filterActions.js";
import { notWatchListAction } from './notWatchListAction.js';
import { serviceProviderAction } from './serviceProviderAction.js';
import { removeWatchListAction } from './watchlistActions.js';
import { searchAction } from "./searchAction.js";
import {
  horrorLandingAction,
  comedyLandingAction,
  dramaLandingAction,
  romanceLandingAction,
  staffLandingAction,
} from "./landingPageAction";

export {
  loginAction,
  ratingAction,
  registerAction,
  recommendationAction,
  uploadAction,
  toggleIsUploaded,
  getRatingAction,
  addToWatchlistAction,
  getWatchlistAction,
  getMoviesAction,
  setFilter,
  notWatchListAction,
  serviceProviderAction,
  removeWatchListAction,
  searchAction,
  horrorLandingAction,
  comedyLandingAction,
  dramaLandingAction,
  romanceLandingAction,
  staffLandingAction,
  removeRatingAction,
};
