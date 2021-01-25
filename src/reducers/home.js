import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    LOAD_MORE_PRODUCTS,
} from '../constants';

const initialState = {
    products: [],
    fetching: false,
    lazyFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_MORE_PRODUCTS:
            return {
                ...state,
                lazyFetching: true
            }
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case FETCH_PRODUCTS_SUCCESS:
            let fetchedProducts = action.payload;
            return {
                ...state,
                products: action.isAdd ? state.products.concat(fetchedProducts): fetchedProducts,
                fetching: false,
                lazyFetching: false
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                fetching: false,
                lazyFetching: false
            };
        default:
            return state
    }
}
