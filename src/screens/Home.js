import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
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
    product_container: {
        // alignItems: 'center',
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.$themeNavyBlueColor,
        backgroundColor: theme.$themeWhiteColor
    },
    product_icon_container: {
        alignItems: 'center' 
    },
    product_icon: {
        margin: 5,
        width: 50,
        height: 50
    },
    product_title: {
        margin: 5,
        fontSize: '0.8rem',
        color: theme.$themeNavyBlueColor,
    }
});

class Home extends Component {

    componentDidMount() {
        this.props.homeActions.getProducts();
    }

    renderProductItem(item) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                }}
                style={styles.product_container}>
                <View style={styles.product_icon_container}>
                    <Image style={styles.product_icon} source={{ uri: item.image }} />
                </View>
                <Text numberOfLines={2} style={styles.product_title}>{item.title}</Text>
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
                    // ListEmptyComponent={<EmptyList />}
                    renderItem={({ index, item }) => this.renderProductItem(item)}
                // onEndReached={() => this.handleLoadMore()}
                />
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