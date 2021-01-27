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

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
    screen_description_text: {
        marginHorizontal: 5,
        fontSize: '0.8rem',
        fontWeight: "bold",
        alignSelf: 'center',
        color: theme.$themeNavyBlueColor,
    },
});

class MapView extends Component {

    static options() {
        return {
            topBar: {
                rightButtonColor: theme.$themeWhiteColor,
                rightButtons: {
                    id: 'dismiss',
                    icon: require('../assets/common/close_icon.png'),
                },
            },
        };
    }

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'dismiss') {
            Navigation.dismissModal(this.props.componentId);
        }
    }

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.screen_description_text}>Map View</Text>
            </View>
        );
    }

}

export default MapView;