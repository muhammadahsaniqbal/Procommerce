import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { Navigation } from 'react-native-navigation';

export default class extends Component {

    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
    };

    componentDidMount() {

        const { type, title, text } = this.props;

        this.dropDownAlertRef.alertWithType(type, title, text);
    }

    onCloseHandler(componentId) {
        return () => Navigation.dismissOverlay(componentId)
    }

    render() {
        const { componentId } = this.props;

        return (
            <View>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref}
                    onClose={this.onCloseHandler(componentId)}
                    onCancel={this.onCloseHandler(componentId)} />
            </View>
        );
    }
}
