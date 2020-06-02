import {
    ADDING_NOTWATCHLIST_START,
    ADDING_NOTWATCHLIST_SUCCESS,
    ADDING_NOTWATCHLIST_FAIL,
} from "../actions/notWatchListAction";

const initialState = {
    movies: [],
    isAdding: false,
    error: "",
};

export const notwatchlist = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_NOTWATCHLIST_START:
            return {
                ...state,
                isAdding: true,
            };
        case ADDING_NOTWATCHLIST_SUCCESS:
            return {
                ...state,
                isAdding: false,
                // movies: action.payload,
            };
        case ADDING_NOTWATCHLIST_FAIL:
            return {
                ...state,
                isAdding: false,
                error: action.payload,
            };
        default:
            return state;
    }
}