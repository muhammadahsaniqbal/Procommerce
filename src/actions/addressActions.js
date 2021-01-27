import {
    ADD_ADDRESS,
    FLASH_ALERT_TYPE_SUCCESS,
} from '../constants';
import { showFlashAlert } from '../utils';

export function addAddress(address) {
    showFlashAlert(FLASH_ALERT_TYPE_SUCCESS, 'Success', 'Address added successfully');
    return (dispatch) => dispatch({ type: ADD_ADDRESS, payload: address });
}