import {
    SET_FILTER_ITEM
} from '../actions/filterActions.js';

const initialState = {
    searchTerm: ""
};

export const filter = (state = initialState, action) => {
    switch (action.type) {
        //SET FILTER ITEM
        case SET_FILTER_ITEM:
            return {
                ...state,
                searchTerm: action.payload
            }

        default:
            return state;
    }
};