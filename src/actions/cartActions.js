import {
    ADD_TO_CART,
    FLASH_ALERT_TYPE_SUCCESS,
} from '../constants';
import { showFlashAlert } from '../utils';

export function addToCart(product) {
    showFlashAlert(FLASH_ALERT_TYPE_SUCCESS, 'Success', 'Product added to cart');
    return (dispatch) => dispatch({ type: ADD_TO_CART, payload: product });
}