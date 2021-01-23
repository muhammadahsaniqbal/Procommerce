import Api from '../services/api';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FLASH_ALERT_TYPE_ERROR,
} from '../constants';
import { showFlashAlert } from '../utils';

export function getProducts() {

    return (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        return Api.get(`/products`)
            .then((response) => {
                dispatch({
                    type: FETCH_PRODUCTS_SUCCESS,
                    payload: response.data,
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