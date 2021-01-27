import {
    ADD_ADDRESS,
} from '../constants';

const initialState = {
    addresses: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ADDRESS:
            let fetchedAddress = action.payload;
            let updatedAddresses = state.addresses.concat(fetchedAddress);
            return {
                ...state,
                addresses: updatedAddresses,
            };
        default:
            return state
    }
}
