import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator } from "react-navigation";
import StartUp from './src/screens/Startup/Startup';
import Estimator from './src/screens/Estimator/Estimator';
import Diary from './src/screens/Diary/Diary';
import CorrectionScreen from './src/screens/CorrectionScreen/CorrectionScreen';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';


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
		Diary: Diary,
		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: {
				title: 'Profile'
			}
		}
	}
)

DiaryStack.navigationOptions = ({navigation}) => {
	return {
		tabBarVisible: navigation.state.index === 0
	}
}



const MainTabsWithoutDrawer = createBottomTabNavigator(
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

const MainTabs = createDrawerNavigator(
	{
		MainTabsWithoutDrawer
	},
	{
		contentComponent: SideDrawer
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
