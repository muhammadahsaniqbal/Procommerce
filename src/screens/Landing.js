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
                                                    text: 'Home'
                                                },
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
                                    selectedIconColor: '#000000'
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
                                                    text: 'Profile'
                                                },
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
                                    selectedIconColor: '#000000'
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
                        backgroundColor: '#dddddd',
                        animate: true
                    },
                },
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