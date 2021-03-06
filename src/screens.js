import React from 'react';
import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';
import Landing from './screens/Landing';
import Profile from './screens/Profile';
import Notification from './components/Notification';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import AddressList from './screens/AddressList';
import MapView from './screens/MapView';

// register all screens of the app (including internal ones)
export default function registerScreens(store, Provider) {

    Navigation.registerComponent(`Landing`, () => (props) =>
        <Provider store={store}>
            <Landing {...props} />
        </Provider>,
        () => Landing);

    Navigation.registerComponent(`Home`, () => (props) =>
        <Provider store={store}>
            <Home {...props} />
        </Provider>,
        () => Home);

    Navigation.registerComponent(`Cart`, () => (props) =>
        <Provider store={store}>
            <Cart {...props} />
        </Provider>,
        () => Cart);

    Navigation.registerComponent(`Profile`, () => (props) =>
        <Provider store={store}>
            <Profile {...props} />
        </Provider>,
        () => Profile);

    Navigation.registerComponent(`ProductDetails`, () => (props) =>
        <Provider store={store}>
            <ProductDetails {...props} />
        </Provider>,
        () => ProductDetails);

    Navigation.registerComponent(`AddressList`, () => (props) =>
        <Provider store={store}>
            <AddressList {...props} />
        </Provider>,
        () => AddressList);

    Navigation.registerComponent(`MapView`, () => (props) =>
        <Provider store={store}>
            <MapView {...props} />
        </Provider>,
        () => MapView);

    Navigation.registerComponent(`Notification`, () => (props) =>
        <Provider store={store}>
            <Notification {...props} />
        </Provider>,
        () => Notification);
}