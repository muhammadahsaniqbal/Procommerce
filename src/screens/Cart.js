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

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
});

class Cart extends Component {

    componentDidMount() {
        alert(this.props.componentId)
    }

    render() {
        return (
            <View style={styles.root}>
                <Text>Cart</Text>
            </View>
        );
    }

}
export default Cart;