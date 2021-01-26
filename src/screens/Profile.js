import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
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
    product_container: {
        alignItems: 'center',
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: theme.$themeWhiteColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.$themeNavyBlueColor,
    },
    product_icon_container: {
        width: '100%',
        height: 70,
    },
    product_icon: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
        marginTop: 5,
        tintColor: theme.$themeNavyBlueColor
    },
    text_container: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    product_title: {
        marginHorizontal: 5,
        fontSize: '0.8rem',
        fontWeight: "bold",
        color: theme.$themeNavyBlueColor,
    },
});

class Profile extends Component {

    constructor(props) {
        super(props);

        let options = [{
            'title': "Toggle RTL",
            'icon': require('../assets/profile/rtl.png'),
            'action': () => this.handleRTL()
        },
        {
            'title': "Enable Notification",
            'icon': require('../assets/profile/notification.png'),
            'action': () => this.handleNotification()
        },
        {
            'title': "Enable Location",
            'icon': require('../assets/profile/location.png'),
            'action': () => this.handleLocation()
        },
        {
            'title': "Addresses",
            'icon': require('../assets/profile/address.png'),
            'action': () => this.handleAddresses()
        }]

        this.state = {
            options: options
        }
    }

    handleRTL() {
        alert('Toggle RTL selected')
    }

    handleNotification() {
        alert('Enable Notification selected')
    }

    handleLocation() {
        alert('Enable Location selected')
    }

    handleAddresses() {
        alert('Addresses selected')
    }

    renderOption(item) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    item.action()
                }}
                style={styles.product_container}>

                <View style={styles.product_icon_container}>
                    <Image style={styles.product_icon} source={item.icon} />
                </View>
                <View style={styles.text_container}>
                    <Text numberOfLines={1} style={styles.product_title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.root}>
                <FlatList
                    style={{}}
                    data={this.state.options}
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews
                    numColumns={2}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ index, item }) => this.renderOption(item)}
                />
            </View>
        );
    }

}
export default Profile;