import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import LoginScreen from './src/screens/Login/Login';

import configureStore from './src/store/configureStore';
// import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

/* Register screens */
Navigation.registerComponent("sdd.LoginScreen", () => LoginScreen, store, Provider);

// Navigation.registerComponent("places.SideDrawer", () => SideDrawer, store, Provider);

/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "sdd.LoginScreen",
		title : "Login"
	}
});