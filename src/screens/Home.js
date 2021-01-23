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

import * as homeActions from '../actions/homeActions';

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
    product_container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.$themeNavyBlueColor,
        backgroundColor: theme.$themeWhiteColor
    },
    product_text_icon_container: {

    },
    product_icon_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    product_icon: {
        margin: 5,
        width: 50,
        height: 50
    },
    product_title: {
        flex: 1,
        margin: 5,
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

    componentDidMount() {
        this.props.homeActions.getProducts();
    }

    showProductDetails = (selectedProduct) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'ProductDetails',
                        passProps: {
                            selectedProduct,
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: 'Details',
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

    renderEmptyList() {
        return (
            <View style={styles.root}>
                <Text style={styles.empty_list_text}>No products available!</Text>
            </View>
        )
    }

    renderSpinner = () => {
        const { home } = this.props;

        if (home.fetching) {
            return (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={theme.$themeNavyBlueColor} />
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
                <Text numberOfLines={5} style={styles.product_title}>{item.title}</Text>
                <View style={styles.product_icon_container}>
                    <Image style={styles.product_icon} source={{ uri: item.image }} />
                    <Text numberOfLines={1} style={styles.price_title}>{priceWithCurrency}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let products = this.props.home.products;
        return (
            <View style={styles.root}>
                <FlatList
                    style={{}}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews
                    initialNumToRender={20}
                    numColumns={2}
                    ListEmptyComponent={this.renderEmptyList()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ index, item }) => this.renderProductItem(item)}
                // onEndReached={() => this.handleLoadMore()}
                />
                {this.renderSpinner()}
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