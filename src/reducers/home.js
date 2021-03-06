import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    LOAD_MORE_PRODUCTS,
    TOTAL_PRODUCTS_COUNT,
} from '../constants';

const initialState = {
    categories: [],
    products: [],
    fetching: false,
    lastPage: false,
    lazyFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case LOAD_MORE_PRODUCTS:
            return {
                ...state,
                lazyFetching: true
            }
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                fetching: false
            };
        case FETCH_PRODUCTS_SUCCESS:
            let fetchedProducts = action.payload;
            let updatedProducts = action.isAdd ? state.products.concat(fetchedProducts) : fetchedProducts;
            return {
                ...state,
                products: updatedProducts,
                lastPage: updatedProducts.length >= TOTAL_PRODUCTS_COUNT,
                fetching: false,
                lazyFetching: false
            };
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                fetching: false
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
