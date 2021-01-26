import { UPDATE_RTL, DIRECTION_ARABIC } from '../constants';

const initialState = {
    isRTL: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_RTL:
            return {
                ...state,
                isRTL: action.payload,
            };
        default:
            return state
    }
}
