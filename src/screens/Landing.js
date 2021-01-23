import React, { Component } from 'react';
import {
    View,
    Image,
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
            bottomTabs: {
                id: 'BOTTOM_TABS_LAYOUT',
                children: [
                    {
                        stack: {
                            id: 'HOME_TAB',
                            children: [
                                {
                                    component: {
                                        id: 'HOME_SCREEN',
                                        name: 'Home',
                                        options: {
                                            popGesture: false,
                                            topBar: {
                                                title: {
                                                    text: 'Home',
                                                    color: '#fff'
                                                },
                                                background: { color: '#800000'},
                                                backButton: {
                                                    visible: false
                                                }
                                            }
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    icon: require('../assets/tabs/home.png'),
                                    iconInsets: { top: 20, left: 0, bottom: -20, right: 0 },
                                    iconColor: '#acacac',
                                    selectedIconColor: '#ffff00'
                                },
                            }
                        }
                    },
                    {
                        stack: {
                            id: 'PROFILE_TAB',
                            children: [
                                {
                                    component: {
                                        id: 'PROFILE_SCREEN',
                                        name: 'Profile',
                                        options: {
                                            popGesture: false,
                                            topBar: {
                                                title: {
                                                    text: 'Profile',
                                                    color: '#fff'
                                                },
                                                background: { color: '#800000'},
                                                backButton: {
                                                    visible: false
                                                }
                                            }
                                        }
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    icon: require('../assets/tabs/profile.png'),
                                    iconInsets: { top: 20, left: 0, bottom: -20, right: 0 },
                                    iconColor: '#acacac',
                                    selectedIconColor: '#ffff00'
                                },
                            }
                        }
                    }
                ],
                options: {
                    topBar: {
                        visible: false
                    },
                    bottomTabs: {
                        backgroundColor: '#800000',
                        animate: true
                    },
                },
            }
        })
    }

    render() {
        return (
            <View style={styles.root}>
                <Image source={require('../assets/landing/procommerce_logo.png')}></Image>
            </View>
        );
    }
}
export default Landing;