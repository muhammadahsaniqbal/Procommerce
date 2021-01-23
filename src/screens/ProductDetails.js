import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from '../config/theme';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

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
        backgroundColor: theme.$themeWhiteColor
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
        margin: 10,
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
            </View>
        );
    }

}
export default ProductDetails;