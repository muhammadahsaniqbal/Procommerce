import { Navigation } from 'react-native-navigation';

export function showFlashAlert(type, title, message) {
    Navigation.showOverlay({
        stack: {
            children: [{
                component: {
                    name: 'Notification',
                    passProps: {
                        type: type,
                        title: title,
                        text: message,
                    },
                    options: {
                        topBar: {
                            visible: false
                        },
                        layout: {
                            componentBackgroundColor: 'transparent',
                        },
                        overlay: {
                            interceptTouchOutside: false,
                            handleKeyboardEvents: false,
                        },
                    },
                },
            },
            ],
        },
    });
}

export function isValueNotNull(value) {
    if (value === undefined || value === null || value === '') {
        return false
    }
    return value
}
