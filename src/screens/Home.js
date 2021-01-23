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

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }

}
export default Home;