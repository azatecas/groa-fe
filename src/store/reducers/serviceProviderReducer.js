import {
    FETCHING_SERVICEPROVIDERS_START,
    FETCHING_SERVICEPROVIDERS_SUCCESS,
    FETCHING_SERVICEPROVIDERS_FAIL
} from '../actions/serviceProviderAction'

const initialState = {
    serviceProviders: [],
    isFetching: false,
    error: ""
};

export const serviceProvider = (state = initialState, action) => {
    switch (action.type) {
        // GET service providers
        case FETCHING_SERVICEPROVIDERS_START:
            return {
                ...state,
                isFetching: true
            }
        // GET service providers SUCCESS
        case FETCHING_SERVICEPROVIDERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                serviceProviders: action.payload
            };
        // GET service providers FAIL
        case FETCHING_SERVICEPROVIDERS_FAIL:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
};