import Api from '../services/api';
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FLASH_ALERT_TYPE_ERROR,
    PRODUCTS_PAGE_SIZE,
    LOAD_MORE_PRODUCTS,
} from '../constants';
import { showFlashAlert } from '../utils';

export function getCategories() {

    return (dispatch) => {
        dispatch({ type: FETCH_CATEGORIES_REQUEST })

        return Api.get(`/products/categories`)
            .then((response) => {
                dispatch({
                    type: FETCH_CATEGORIES_SUCCESS,
                    payload: response.data,
                });
                return response.data;
            })
            .catch((error) => {
                console.log(error)
                showFlashAlert(FLASH_ALERT_TYPE_ERROR, 'Error', 'Something went wrong while fetching categories. Please try again later.');
                dispatch({
                    type: FETCH_CATEGORIES_FAILURE,
                    payload: error.response.data,
                });
                return null;
            });
    };
}

export function getProducts(pageIndex = 1, category = null) {

    return (dispatch) => {
        pageIndex === 1 ? dispatch({ type: FETCH_PRODUCTS_REQUEST }) : dispatch({ type: LOAD_MORE_PRODUCTS })
        let url = category ? `/products/category/${category}` : `/products?limit=${PRODUCTS_PAGE_SIZE}` 
        return Api.get(`${url}`)
            .then((response) => {
                dispatch({
                    type: FETCH_PRODUCTS_SUCCESS,
                    payload: response.data,
                    isAdd: pageIndex !== 1,
                });
            })
            .catch((error) => {
                console.log(error)
                showFlashAlert(FLASH_ALERT_TYPE_ERROR, 'Error', 'Something went wrong while fetching products. Please try again later.');
                dispatch({
                    type: FETCH_PRODUCTS_FAILURE,
                    payload: error.response.data,
                });
            });
    };
}