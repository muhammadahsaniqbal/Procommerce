import {
    ADD_TO_CART,
} from '../constants';

const initialState = {
    products: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state
    }
}
