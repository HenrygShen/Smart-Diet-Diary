import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import LoginScreen from './src/screens/Login/Login';

import configureStore from './src/store/configureStore';
import DiaryScreen from './src/screens/Diary/Diary';
import PhotoScreen from './src/screens/Photo/Photo';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

/* Register screens */
Navigation.registerComponent("sdd.LoginScreen", () => LoginScreen, store, Provider);
Navigation.registerComponent("sdd.DiaryScreen", () => DiaryScreen, store, Provider);
Navigation.registerComponent("sdd.PhotoScreen", () => PhotoScreen, store, Provider);


Navigation.registerComponent("sdd.SideDrawer", () => SideDrawer, store, Provider);

/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "sdd.LoginScreen",
		title : "Login"
	}
});