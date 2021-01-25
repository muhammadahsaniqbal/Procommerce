import {
    UPDATE_CART,
} from '../constants';

const initialState = {
    products: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CART:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state
    }
}
