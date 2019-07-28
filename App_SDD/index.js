import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

const store = configureStore();

const reduxComponent = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('App_SDD', () => reduxComponent);
