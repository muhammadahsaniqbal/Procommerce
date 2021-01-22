import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class Landing extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.moveToHomeScreen()
        }, 1000);
    }


    moveToHomeScreen() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'Home',
                options: {
                    popGesture: false,
                    topBar: {
                        title: {
                            text: 'Home'
                        },
                        backButton: {
                            visible: false
                        }
                    }
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.root}>
                <Text>Welcome to Procommerce</Text>
            </View>
        );
    }
}
export default Landing;