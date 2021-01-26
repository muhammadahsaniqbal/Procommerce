import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';
import { HorizontalCategoryList } from '../components/HorizontalCategoryList';
import * as homeActions from '../actions/homeActions';
import { OPENED_VIA_HOME } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
    spinner: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    lazySpinner: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    product_container: {
        alignItems: 'center',
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
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
    product_icon_container: {
        width: '100%',
        height: 70,
    },
    product_icon: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
        marginTop: 5,
    },
    text_container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    product_title: {
        marginHorizontal: 5,
        marginBottom: 5,
        fontSize: '0.8rem',
        color: theme.$themeNavyBlueColor,
    },
    price_title: {
        margin: 5,
        fontSize: '0.8rem',
        fontWeight: "bold",
        color: theme.$themeNavyBlueColor,
    },
    empty_list_text: {
        fontWeight: "bold",
        fontSize: 18,
        color: theme.$themeNavyBlueColor
    },
});

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 1,
            refreshing: false,
            categories: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.refreshing && !nextProps.home.fetching) {
            return {
                refreshing: false,
            };
        }
    }

    // MARK: - Push Notification delegate methods

    notification = () => {

        PushNotification.configure({
            onRegister: function (token) {

                console.log("DEVICE_TOKEN:", token);

                if (token === null || token === undefined) {
                    return
                }

                //Store device token in storage.
                AsyncStorage.setItem('DEVICE_TOKEN', token.token)
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    componentDidMount() {
        this.props.homeActions.getCategories().then(categoryTitles => {
            if (categoryTitles) {
                var categories = []
                categoryTitles.forEach((title) => {
                    let category = {
                        title: title,
                        selected: false
                    }
                    categories.push(category)
                })
                this.setState({ categories: categories });
            }
        });
        this.props.homeActions.getProducts();
        this.notification();
    }

    showProductDetails = (selectedProduct) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'ProductDetails',
                        passProps: {
                            selectedProduct,
                            openedVia: OPENED_VIA_HOME
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: selectedProduct.category,
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

    getSelectedCategory() {
        var selectedCategories = this.state.categories.filter((category) => category.selected)
        return selectedCategories.length > 0 ? selectedCategories[0].title : null
    }

    loadFromStart() {
        this.setState({ pageIndex: 1, refreshing: true });
        this.props.homeActions.getProducts(1, this.getSelectedCategory());
    }

    handleLoadMore = () => {

        if (this.props.home.fetching || this.props.home.lastPage || this.getSelectedCategory())
            return;

        let { pageIndex } = this.state;
        pageIndex += 1;
        this.props.homeActions.getProducts(pageIndex, this.getSelectedCategory());
        this.setState({ pageIndex });
    }

    changeCategory(category) {

        this.state.categories.forEach((item) => {
            if (item.title !== category.title) {
                item.selected = false
            }
        })
        category.selected = !category.selected
        this.loadFromStart();

    }

    renderEmptyList() {
        return (
            <View style={styles.root}>
                <Text style={styles.empty_list_text}>No products available!</Text>
            </View>
        )
    }

    renderSpinner = () => {
        const { home } = this.props;

        if (home.fetching && !this.state.refreshing) {
            return (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={theme.$themeNavyBlueColor} />
                </View>
            );
        }

        return null;
    };

    renderLazySpinner = () => {
        const { home } = this.props;

        if (home.lazyFetching) {
            return (
                <View style={styles.lazySpinner}>
                    <ActivityIndicator size='small' color={theme.$themeNavyBlueColor} />
                </View>
            );
        }

        return null;
    };

    renderProductItem(item) {
        let priceWithCurrency = '$ ' + item.price
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.showProductDetails(item)
                }}
                style={styles.product_container}>

                <View style={styles.product_icon_container}>
                    <Image style={styles.product_icon} source={{ uri: item.image }} />
                </View>
                <View style={styles.text_container}>
                    <Text numberOfLines={1} style={styles.price_title}>{priceWithCurrency}</Text>
                    <Text numberOfLines={2} style={styles.product_title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { home } = this.props;
        let products = home.products;
        return (
            <View style={styles.root}>
                <HorizontalCategoryList
                    categories={this.state.categories}
                    changeCategory={(item) => this.changeCategory(item)}
                />
                <FlatList
                    style={{}}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews
                    numColumns={2}
                    ListEmptyComponent={this.renderEmptyList()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ index, item }) => this.renderProductItem(item)}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={.7}
                    onRefresh={() => this.loadFromStart()}
                    refreshing={this.state.refreshing && this.props.home.fetching}
                />
                {this.renderSpinner()}
                {this.renderLazySpinner()}
            </View>
        );
    }

}
export default connect(
    state => ({
        home: state.home
    }),
    dispatch => ({
        homeActions: bindActionCreators(homeActions, dispatch),
    })
)(Home);