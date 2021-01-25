import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';
import * as cartActions from '../actions/cartActions';
import { OPENED_VIA_CART } from '../constants';

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
    product_container: {
        flexDirection: 'row',
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
    product_icon_container: {
        width: '30%',
        aspectRatio: 1
    },
    product_icon: {
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
        marginTop: 5,
    },
    right_container: {
        width: '70%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    close_button_container: {
        width: 25,
        height: 25,
        top: 5,
        right: 5,
        position: 'absolute',
    },
    product_title: {
        marginTop: 25,
        marginBottom: 5,
        marginHorizontal: 5,
        fontSize: '0.8rem',
        alignSelf: 'center',
        color: theme.$themeNavyBlueColor,
    },
    price_title: {
        marginTop: 10,
        marginHorizontal: 5,
        fontSize: '0.8rem',
        fontWeight: "bold",
        alignSelf: 'center',
        color: theme.$themeNavyBlueColor,
    },
    empty_list_text: {
        fontWeight: "bold",
        fontSize: 18,
        color: theme.$themeNavyBlueColor
    },
});

class Cart extends Component {

    showProductDetails = (selectedProduct) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'ProductDetails',
                        passProps: {
                            selectedProduct,
                            openedVia: OPENED_VIA_CART
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

    removeFromCart(product) {
        const { cart, cartActions } = this.props;

        var products = cart.products;
        var idx = products.findIndex(p => p.id==product.id);
        products.splice(idx,1);
        cartActions.updateCart(products, false)
        setTimeout(() => {
            Navigation.mergeOptions('CART_SCREEN', {
                bottomTab: {
                    badge: cart.products.length?.toString(),
                },
            });
        }, 500);
    }

    renderEmptyList() {
        return (
            <View style={styles.root}>
                <Text style={styles.empty_list_text}>No products available!</Text>
            </View>
        )
    }

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
                <View style={styles.right_container}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.removeFromCart(item)
                        }}
                        style={styles.close_button_container}>
                        <Image style={{tintColor: 'black'}} source={require('../assets/common/close.png')}></Image>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.price_title}>{priceWithCurrency}</Text>
                    <Text numberOfLines={3} style={styles.product_title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let products = this.props.cart.products;
        return (
            <View style={styles.root}>
                <FlatList
                    style={{}}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this.renderEmptyList()}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ index, item }) => this.renderProductItem(item)}
                // onEndReached={() => this.handleLoadMore()}
                />
            </View>
        );
    }

}
export default connect(
    state => ({
        cart: state.cart
    }),
    dispatch => ({
        cartActions: bindActionCreators(cartActions, dispatch),
    })
)(Cart);