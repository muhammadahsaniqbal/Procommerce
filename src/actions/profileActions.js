import {
    FLASH_ALERT_TYPE_INFO,
    UPDATE_RTL,
} from '../constants';
import { showFlashAlert } from '../utils';

export function updateRtl(isRTL) {
    let message = isRTL ? 'Application layout changed to Arabic' : 'Application layout changed to English'
    showFlashAlert(FLASH_ALERT_TYPE_INFO, 'Layout Changed', message);
    return (dispatch) => dispatch({ type: UPDATE_RTL, payload: isRTL });
}