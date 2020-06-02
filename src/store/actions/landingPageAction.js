import axiosWithAuth from "../../utils/axiosWithAuth.js";

const horrorId = process.env.REACT_APP_HORROR_LIST;
const comedyId = process.env.REACT_APP_COMEDY_LIST;
const dramaId = process.env.REACT_APP_DRAMA_LIST;
const romanceId = process.env.REACT_APP_ROMANCE_LIST;
const staffId = process.env.REACT_APP_STAFF_LIST;

//Base function for all actions to fetch data from the same endpoint but with different params
const landingPageAction = (movie_list_id, dispatch, START, SUCCESS, FAIL) => {
    dispatch({ 
        type: START 
    });
    axiosWithAuth()
        .post(`/landingpage`, {id:movie_list_id})
        .then(res => {
            dispatch({
                type: SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: FAIL,
                payload: err
            })
        })
};

//FETCH HORROR MOVIE ACTION
export const FETCHING_HORROR_START = "FETCHING_HORROR_START";
export const FETCHING_HORROR_SUCCESS = "FETCHING_HORROR_SUCCESS";
export const FETCHING_HORROR_FAIL = "FETCHING_HORROR_FAIL";

export const horrorLandingAction = () => dispatch => {
    landingPageAction(horrorId, dispatch, FETCHING_HORROR_START, FETCHING_HORROR_SUCCESS, FETCHING_HORROR_FAIL)
}
//FETCH COMEDY MOVIE ACTION
export const FETCHING_COMEDY_START = "FETCHING_COMEDY_START";
export const FETCHING_COMEDY_SUCCESS = "FETCHING_COMEDY_SUCCESS";
export const FETCHING_COMEDY_FAIL = "FETCHING_COMEDY_FAIL";

export const comedyLandingAction = () => dispatch => {
    landingPageAction(comedyId, dispatch, FETCHING_COMEDY_START, FETCHING_COMEDY_SUCCESS, FETCHING_COMEDY_FAIL)
}

//FETCH DRAMA MOVIE ACTION
export const FETCHING_DRAMA_START = "FETCHING_DRAMA_START";
export const FETCHING_DRAMA_SUCCESS = "FETCHING_DRAMA_SUCCESS";
export const FETCHING_DRAMA_FAIL = "FETCHING_DRAMA_FAIL";

export const dramaLandingAction = () => dispatch => {
    landingPageAction(dramaId, dispatch, FETCHING_DRAMA_START, FETCHING_DRAMA_SUCCESS, FETCHING_DRAMA_FAIL)
}

//FETCH ROMANCE MOVIE ACTION
export const FETCHING_ROMANCE_START = "FETCHING_ROMANCE_START";
export const FETCHING_ROMANCE_SUCCESS = "FETCHING_ROMANCE_SUCCESS";
export const FETCHING_ROMANCE_FAIL = "FETCHING_ROMANCE_FAIL";

export const romanceLandingAction = () => dispatch => {
    landingPageAction(romanceId, dispatch, FETCHING_ROMANCE_START, FETCHING_ROMANCE_SUCCESS, FETCHING_ROMANCE_FAIL)
}

//FETCH STAFF MOVIE ACTION
export const FETCHING_STAFF_START = "FETCHING_STAFF_START";
export const FETCHING_STAFF_SUCCESS = "FETCHING_STAFF_SUCCESS";
export const FETCHING_STAFF_FAIL = "FETCHING_STAFF_FAIL";

export const staffLandingAction = () => dispatch => {
    landingPageAction(staffId, dispatch, FETCHING_STAFF_START, FETCHING_STAFF_SUCCESS, FETCHING_STAFF_FAIL)
}