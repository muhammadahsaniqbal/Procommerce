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
import { OPENED_VIA_HOME } from '../constants';

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
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.refreshing && !nextProps.home.fetching) {
            return {
                refreshing: false,
            };
        }
    }

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

    loadFromStart() {
        this.setState({ pageIndex: 1, refreshing: true });
        this.props.homeActions.getProducts();
    }

    handleLoadMore = () => {
        
        if (this.props.home.fetching || this.props.home.lastPage)
            return;
        
        let { pageIndex } = this.state;
        pageIndex += 1;
        this.props.homeActions.getProducts(pageIndex);
        this.setState({ pageIndex });
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
        let products = this.props.home.products;
        return (
            <View style={styles.root}>
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