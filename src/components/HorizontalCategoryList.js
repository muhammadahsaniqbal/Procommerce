import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native';
import theme from '../config/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = EStyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        height: height * .06,
    },
    list_view: {
        flex: 1,
        justifyContent: 'center',
    },
    category_container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: theme.$themeNavyBlueColor,
    },
    category_title: {
        marginHorizontal: 10,
        fontSize: '0.8rem',
        fontWeight: "bold",
        color: theme.$themeNavyBlueColor,
    },
})


export class HorizontalCategoryList extends Component {

    selectCategory(category) {
        this.props.changeCategory(category);
    }

    renderCategoryItem(item) {
        return (
            <TouchableOpacity style={styles.category_container}
                onPress={() => this.props.changeCategory(item)}>
                <Text numberOfLines={1} style={styles.category_title}>{item}</Text>
            </TouchableOpacity>
        );
    }

    render() {

        let minItems = width / styles.category_container.width;

        return (
            <View style={styles.container}>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            this.flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                    contentContainerStyle={this.props.categories.length < minItems && styles.list_view}
                    extraData={this.props}
                    data={this.props.categories}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ index, item }) => this.renderCategoryItem(item)}
                />
            </View>
        )
    }
}