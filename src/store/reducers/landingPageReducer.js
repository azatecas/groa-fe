import {
    FETCHING_HORROR_START,
    FETCHING_HORROR_SUCCESS,
    FETCHING_HORROR_FAIL,
    FETCHING_COMEDY_START,
    FETCHING_COMEDY_SUCCESS,
    FETCHING_COMEDY_FAIL,
    FETCHING_DRAMA_START,
    FETCHING_DRAMA_SUCCESS,
    FETCHING_DRAMA_FAIL,
    FETCHING_ROMANCE_START,
    FETCHING_ROMANCE_SUCCESS,
    FETCHING_ROMANCE_FAIL,
    FETCHING_STAFF_START,
    FETCHING_STAFF_SUCCESS,
    FETCHING_STAFF_FAIL
} from "../actions/landingPageAction";


const initialState = {
    horrorMovies: [],
    horrorMoviesRec: [],
    comedyMovies: [],
    comedyMoviesRec: [],
    dramaMovies: [],
    dramaMoviesRec: [],
    romanceMovies: [],
    romanceMoviesRec: [],
    staffMovies: [],
    staffMoviesRec: [],
    isFetching: false,
    error: ""
};


export const landingPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_HORROR_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_HORROR_SUCCESS:
            return {
                ...state,
                horrorMovies: action.payload.data,
                horrorMoviesRec: action.payload.recs,
                isFetching: false,
            }
        case FETCHING_HORROR_FAIL: 
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
        case FETCHING_COMEDY_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_COMEDY_SUCCESS:
            return {
                ...state,
                comedyMovies: action.payload.data,
                comedyMoviesRec: action.payload.recs,
                isFetching: false,
            }
        case FETCHING_COMEDY_FAIL: 
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
            case FETCHING_DRAMA_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_DRAMA_SUCCESS:
            return {
                ...state,
                dramaMovies: action.payload.data,
                dramaMoviesRec: action.payload.recs,
                isFetching: false,
            }
        case FETCHING_DRAMA_FAIL: 
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
        case FETCHING_ROMANCE_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_ROMANCE_SUCCESS:
            return {
                ...state,
                romanceMovies: action.payload.data,
                romanceMoviesRec: action.payload.recs,
                isFetching: false,
            }
        case FETCHING_ROMANCE_FAIL: 
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
        case FETCHING_STAFF_START:
            return {
                ...state,
                isFetching: true,
            }
        case FETCHING_STAFF_SUCCESS:
            return {
                ...state,
                staffMovies: action.payload.data,
                staffMoviesRec: action.payload.recs,
                isFetching: false,
            }
        case FETCHING_STAFF_FAIL: 
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
        default:
            return state;
    }
}