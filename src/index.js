import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  Dimensions,
  View,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { persistStore } from 'redux-persist';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import store from './store';
import theme from './config/theme';
import registerScreens from './screens';


registerScreens(store, Provider);

// Calcuate styles
const { width } = Dimensions.get('window');
EStyleSheet.build({
  $rem: width > 340 ? 18 : 16,
  // $outline: 1,
  ...theme,
});

Navigation.setDefaultOptions({
  // statusBar: {
  //   backgroundColor: '#4d089a'
  // },
  topBar: {
    title: {
      color: '#565656'
    },
    backButton: {
      color: '#000000'
    },
    background: {
      color: 'white'
    }
  },
  layout: { orientation: ['portrait'] },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.$themeScreenBackgroundColor
  },
  bg_image: {
    height: '10%',
    aspectRatio: 2.96,
  }
});



class App extends React.Component {

  constructor(props) {
    super(props);
  }

  moveToLandingScreen = (delay) => {
    setTimeout(() => {
      Navigation.setStackRoot(this.props.componentId, {
        component: {
          name: 'Landing',
          options: {
            topBar: {
              visible: false
            },
            animations: {
              push: {
                enabled: Platform.OS === 'ios' ? 'false' : 'true',
              },
            }
          }
        }
      })
    }, delay);
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    const persistor = persistStore(store, {}, () => this.moveToLandingScreen(Platform.OS === 'ios' ? 0 : 1500));
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.root}>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
