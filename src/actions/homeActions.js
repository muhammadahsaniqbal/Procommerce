import Api from '../services/api';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FLASH_ALERT_TYPE_ERROR,
    PRODUCTS_PAGE_SIZE,
    LOAD_MORE_PRODUCTS,
} from '../constants';
import { showFlashAlert } from '../utils';

export function getProducts(pageIndex = 1) {

    return (dispatch) => {
        pageIndex === 1 ? dispatch({ type: FETCH_PRODUCTS_REQUEST }) : dispatch({ type: LOAD_MORE_PRODUCTS })

        return Api.get(`/products?limit=${PRODUCTS_PAGE_SIZE}`)
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