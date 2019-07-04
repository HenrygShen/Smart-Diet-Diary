import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import StartScreen from './src/screens/Startup/Startup';

import configureStore from './src/store/configureStore';
import DiaryScreen from './src/screens/Diary/Diary';
import EstimatorScreen from './src/screens/Estimator/Estimator';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import CorrectionScreen from './src/screens/CorrectionScreen/CorrectionScreen';

const store = configureStore();

/* Register screens */
Navigation.registerComponent("sdd.StartScreen", () => StartScreen, store, Provider);
Navigation.registerComponent("sdd.DiaryScreen", () => DiaryScreen, store, Provider);
Navigation.registerComponent("sdd.EstimatorScreen", () => EstimatorScreen, store, Provider);
Navigation.registerComponent("sdd.CorrectionScreen", () => CorrectionScreen, store, Provider);

Navigation.registerComponent("sdd.SideDrawer", () => SideDrawer, store, Provider);

/* Start app */
Navigation.startSingleScreenApp({

	screen : {
		screen: "sdd.StartScreen",
		title : "Smart Diet Diary"
	}
});