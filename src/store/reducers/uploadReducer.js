import {
  UPLOADING_FILE_START,
  UPLOADING_FILE_SUCCESS,
  UPLOADING_FILE_FAIL,
  UPLOADED_SUCCESSFUL
} from "../actions/uploadAction";

const initialState = {
  isUploading: false,
  isUploaded: false,
  ratings: [],
  reviews: [],
  watched: [],
  watchlist: [],
  error: ""
};

export const upload = (state = initialState, action) => {
  switch (action.type) {
    //UPLOAD START
    case UPLOADING_FILE_START:
      return {
        ...state,
        isUploading: true
      };
    //UPLOAD SUCCESS
    case UPLOADING_FILE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        isUploaded: true,
        ratings: action.payload.ratings,
        reviews: action.payload.reviews,
        watched: action.payload.watched,
        watchlist: action.payload.watchlist
      };
    //LOGIN FAIL
    case UPLOADING_FILE_FAIL:
      return {
        ...state,
        isUploading: false,
        error: action.payload
      };

    // toggles is uploaded to  allow the recommendedAction to run in Recommendations.js
    case UPLOADED_SUCCESSFUL:
      return {
        ...state,
        isUploaded: false
      };

    default:
      return state;
  }
};
