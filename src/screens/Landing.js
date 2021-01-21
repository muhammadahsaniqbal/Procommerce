import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class Landing extends Component {

    render() {
        return (
            <View style={styles.root}>
                <Text>Landing Screen</Text>
            </View>
        );
    }
}
export default Landing;