import {
    UPDATE_CART,
    FLASH_ALERT_TYPE_SUCCESS,
    FLASH_ALERT_TYPE_INFO,
} from '../constants';
import { showFlashAlert } from '../utils';

export function updateCart(products, isAddToCart) {
    isAddToCart ? showFlashAlert(FLASH_ALERT_TYPE_SUCCESS, 'Success', 'Product added to cart') : showFlashAlert(FLASH_ALERT_TYPE_INFO, 'Success', 'Cart updated successfully');
    return (dispatch) => dispatch({ type: UPDATE_CART, payload: products });
}