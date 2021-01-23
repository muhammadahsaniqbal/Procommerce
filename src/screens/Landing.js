import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Navigation } from 'react-native-navigation';
import theme from '../config/theme';

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
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
                                                    color: theme.$themeWhiteColor
                                                },
                                                background: { color: theme.$themeNavyBlueColor},
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
                                    iconColor: theme.$themeWhiteColor,
                                    selectedIconColor: theme.$selectedTabColor
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
                                                    color: theme.$themeWhiteColor
                                                },
                                                background: { color: theme.$themeNavyBlueColor},
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
                                    iconColor: theme.$themeWhiteColor,
                                    selectedIconColor: theme.$selectedTabColor
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
                        backgroundColor: theme.$themeNavyBlueColor,
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