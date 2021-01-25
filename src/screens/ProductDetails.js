import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';

import * as cartActions from '../actions/cartActions';
import { OPENED_VIA_HOME } from '../constants';

const dimensions = Dimensions.get('window');

const styles = EStyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.$themeScreenBackgroundColor
    },
    product_image_container: {
        width: '100%',
        height: dimensions.width * 0.5,
        backgroundColor: theme.$themeWhiteColor,
        shadowColor: theme.$cardShadowColor,
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 5,
        shadowRadius: 5,
    },
    product_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    product_title_container: {
        width: '100%',
        alignItems: 'center',
    },
    product_title: {
        marginHorizontal: 10,
        marginVertical: 20,
        fontSize: '1.2rem',
        fontWeight: "bold",
        color: theme.$themeNavyBlueColor,
    },
    product_description_container: {
        width: '100%',
        alignItems: 'center',
    },
    product_description: {
        margin: 10,
        fontSize: '0.8rem',
        color: theme.$themeNavyBlueColor,
    },
    footer_container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    add_cart_button: {
        flexDirection: 'row',
        backgroundColor: theme.$themeNavyBlueColor,
        height: 45,
        borderRadius: 22,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    add_cart_button_title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.$themeWhiteColor,
    },
    product_price_button_title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: theme.$selectedTabColor,
    },
});

class ProductDetails extends Component {

    static options() {
        return {
            topBar: {
                rightButtonColor: theme.$themeWhiteColor,
                rightButtons: {
                    id: 'dismiss',
                    icon: require('../assets/common/close_icon.png'),
                },
            },
        };
    }

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'dismiss') {
            Navigation.dismissModal(this.props.componentId);
        }
    }

    addToCart() {
        const { cart, cartActions, selectedProduct } = this.props;

        var products = cart.products;
        products = products.concat(selectedProduct)
        cartActions.updateCart(products, true)
        setTimeout(() => {
            Navigation.mergeOptions('CART_SCREEN', {
                bottomTab: {
                    badge: cart.products.length?.toString(),
                },
            });
        }, 500);
    }

    renderFooter() {
        let product = this.props.selectedProduct
        if (this.props.openedVia == OPENED_VIA_HOME) {
            return (
                <View style={styles.footer_container}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.addToCart()
                        }}
                        style={styles.add_cart_button}>
                        <Text style={styles.add_cart_button_title}>Add to Cart</Text>
                        <Text style={styles.product_price_button_title}>$ {product.price}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }

    render() {
        let product = this.props.selectedProduct
        return (
            <View style={styles.root}>
                <View style={styles.product_image_container}>
                    <Image style={styles.product_image} source={{ uri: product.image }} />
                </View>
                <View style={styles.product_title_container}>
                    <Text style={styles.product_title}>{product.title}</Text>
                </View>
                <View style={styles.product_description_container}>
                    <Text style={styles.product_description}>{product.description}</Text>
                </View>
                {this.renderFooter()}
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
)(ProductDetails);