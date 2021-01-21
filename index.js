/**
 * @format
 */

import App from './src/index'
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('App', () => App);

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'App',
                            options: {
                                topBar: {
                                  visible: false,
                                  height: 0
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
});
