import React from 'react';
import { Navigation } from 'react-native-navigation';
import Landing from './screens/Landing';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {

    Navigation.registerComponent(`Landing`, () => (props) =>
        <Provider store={store}>
            <Landing {...props} />
        </Provider>,
        () => Landing);
}