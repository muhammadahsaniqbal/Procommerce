import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from '../constants';

const initialState = {
    products: [],
    fetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                fetching: false,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                fetching: false,
            };
        default:
            return state
    }
}
