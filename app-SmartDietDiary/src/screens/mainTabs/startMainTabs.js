import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {

    /* Execute async functions which return the icons and THEN register tabs */
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
    .then(
        (icons) => {
            Navigation.startTabBasedApp({

                tabs: [
                    {
                        screen: "places.SharePlaceScreen",
                        label: "Share place",
                        title: "Share place",
                        icon: icons[0],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: icons[2],
                                    title: 'Menu',
                                    id: 'sideDrawerToggle'

                                }
                            ]
                        }
                    },
                    {
                        screen: "places.FindPlaceScreen",
                        label: "Find place",
                        title: "Find place",
                        icon: icons[1],
                        navigatorButtons: {
                            leftButtons: [
                                {
                                    icon: icons[2],
                                    title: 'Menu',
                                    id: 'sideDrawerToggle'

                                }
                            ]
                        }
                    }
                ],
                /* IOS only */
                tabsStyle: {
                    tabBarSelectedButtonColor: 'orange'
                },
                /* Android only */
                appStyle: {
                    tabBarSelectedButtonColor: 'orange'
                },
                drawer: {
                    left: {
                        screen: "places.SideDrawer"
                    }
                }
            });
        }
    )

}

export default startTabs;
