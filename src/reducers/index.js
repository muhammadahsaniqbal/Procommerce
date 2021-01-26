import { combineReducers } from 'redux';

import home from './home';
import cart from './cart';
import profile from './profile';

export default combineReducers({
    home,
    cart,
    profile,
});
