import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';
import RNLocation from 'react-native-location';
import * as addressActions from '../actions/addressActions';

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
    address_container: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.$themeNavyBlueColor,
        backgroundColor: theme.$themeWhiteColor,
        elevation: 2,
        shadowColor: theme.$cardShadowColor,
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 5,
        shadowRadius: 5,
    },
    address_details: {
        marginTop: 25,
        marginBottom: 5,
        marginHorizontal: 5,
        fontSize: '0.8rem',
        alignSelf: 'center',
        color: theme.$themeNavyBlueColor,
    },
    address_title: {
        marginTop: 10,
        marginHorizontal: 5,
        fontSize: '0.8rem',
        fontWeight: "bold",
        alignSelf: 'center',
        color: theme.$themeNavyBlueColor,
    },
    footer_container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    add_address_button: {
        backgroundColor: theme.$themeNavyBlueColor,
        height: 45,
        borderRadius: 22,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    add_address_button_title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.$themeWhiteColor,
    },
    empty_list_text: {
        fontWeight: "bold",
        fontSize: 18,
        color: theme.$themeNavyBlueColor
    },
});

class AddressList extends Component {

    static sharedGeoCoordinates = {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0051,
        longitudeDelta: 0.0051,
    }

    componentDidMount() {
        this.findCoordinates();
    }

    showAddressDetails = (selectedAddress) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'MapView',
                        passProps: {
                            selectedAddress,
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: selectedAddress.title,
                                    color: theme.$themeWhiteColor
                                },
                                background: { color: theme.$themeNavyBlueColor },
                            },
                        },
                    },
                },
                ],
            },
        });
    }

    findCoordinates() {

        RNLocation.configure({
            distanceFilter: 5.0,
            desiredAccuracy: {
                ios: "best",
                android: "balancedPowerAccuracy"
            },

            // Android only
            androidProvider: "auto",
            interval: 5000,
            fastestInterval: 10000,
            maxWaitTime: 5000,

            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1,
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })

        RNLocation.requestPermission({
            ios: "always",
            android: {
                detail: "fine"
            }
        }).then(granted => {
            if (granted) {

                RNLocation.getLatestLocation({ timeout: 60000 })
                    .then(location => {

                        if (!location) {
                            return
                        }

                        const latitude = location.latitude
                        const longitude = location.longitude

                        AddressList.sharedGeoCoordinates.latitude = latitude
                        AddressList.sharedGeoCoordinates.longitude = longitude

                        this.state.region.latitude = latitude
                        this.state.region.longitude = longitude

                        const region = {
                            latitude: latitude,
                            longitude: longitude
                        }
                    })
            }
        })
    }

    addAddress() {
        
    }

    renderEmptyList() {
        return (
            <View style={styles.root}>
                <Text style={styles.empty_list_text}>No address available!</Text>
            </View>
        )
    }

    renderFooter() {
        return (
            <View style={styles.footer_container}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.addAddress()
                    }}
                    style={styles.add_address_button}>
                    <Text style={styles.add_address_button_title}>Add Address</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderAddressItem(item) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.showAddressDetails(item)
                }}
                style={styles.address_container}>
                <Text numberOfLines={1} style={styles.address_title}>{item.title}</Text>
                <Text numberOfLines={3} style={styles.address_details}>{item.details}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let addresses = this.props.address.addresses;
        return (
            <View style={styles.root}>
                <FlatList
                    style={{}}
                    data={addresses}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.renderEmptyList()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ index, item }) => this.renderAddressItem(item)}
                />
                {this.renderFooter()}
            </View>
        );
    }

}
export default connect(
    state => ({
        address: state.address
    }),
    dispatch => ({
        addressActions: bindActionCreators(addressActions, dispatch),
    })
)(AddressList);