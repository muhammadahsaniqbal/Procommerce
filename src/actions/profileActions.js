import {
    DIRECTION_ARABIC,
    FLASH_ALERT_TYPE_SUCCESS, UPDATE_RTL,
} from '../constants';
import { showFlashAlert } from '../utils';

export function updateRtl(isRTL) {
    let message = isRTL ? 'Application layout changed to Arabic' : 'Application layout changed to English'
    showFlashAlert(FLASH_ALERT_TYPE_SUCCESS, 'Success', message);
    return (dispatch) => dispatch({ type: UPDATE_RTL, payload: isRTL });
}