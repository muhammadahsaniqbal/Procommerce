import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

class Home extends Component {

    // static options() {
    //     return {
    //         bottomTabs: {
    //             id: 'BOTTOM_TABS_LAYOUT',
    //             children: [
    //                 {
    //                     stack: {
    //                         id: 'HOME_TAB',
    //                         children: [
    //                             {
    //                                 component: {
    //                                     id: 'HOME_SCREEN',
    //                                     name: 'Home'
    //                                 }
    //                             }
    //                         ],
    //                         options: {
    //                             bottomTab: {
    //                                 icon: require('../assets/tabs/home.png')
    //                             }
    //                         }
    //                     }
    //                 },
    //                 {
    //                     stack: {
    //                         id: 'PROFILE_TAB',
    //                         children: [
    //                             {
    //                                 component: {
    //                                     id: 'PROFILE_SCREEN',
    //                                     name: 'Profile'
    //                                 }
    //                             }
    //                         ],
    //                         options: {
    //                             bottomTab: {
    //                                 icon: require('../assets/tabs/profile.png')
    //                             }
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     };
    // }

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }

}
export default Home;