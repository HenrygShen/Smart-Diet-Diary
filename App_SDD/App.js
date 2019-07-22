import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import StartUp from './src/screens/Startup/Startup';
import Estimator from './src/screens/Estimator/Estimator';
import Diary from './src/screens/Diary/Diary';
import CorrectionScreen from './src/screens/CorrectionScreen/CorrectionScreen';


const EstimatorPage = createStackNavigator(
	{
		Estimator: {
			screen: Estimator,
			navigationOptions: {
				title: 'Calculate calories'
			}
		},
		CorrectionScreen: {
			screen: CorrectionScreen,
			navigationOptions: {
				title: 'Edit prediction'
			}
		}
	} 
)

EstimatorPage.navigationOptions = ({navigation}) => {
	return {
		tabBarVisible: navigation.state.index === 0
	}
}

const DiaryStack = createStackNavigator(
	{
		Diary: {
			screen: Diary,
			navigationOptions: {
				title: 'Diary',
				headerTitle: 'Diary'
			}
		}
	}
)

const MainTabs = createBottomTabNavigator(
	{
		Diary: {
			screen: DiaryStack,
			navigationOptions: {
				title: 'Your diary'
			}
		},
		Estimator: {
			screen: EstimatorPage,
			navigationOptions: {
				title: 'Estimator'
			}
		}
	}
)

const RootNavigator = createSwitchNavigator(
	{
		StartUp,
		MainTabs
	},
	{
		initialRouteName: 'StartUp'
	}
)
const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {

	render() {
		return <AppContainer />;
	}
}
