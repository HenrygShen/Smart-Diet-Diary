import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {

    /* Execute async functions which return the icons and THEN register tabs */
    Promise.all([
        Icon.getImageSource('md-calendar', 30),
        Icon.getImageSource('md-camera', 30),
        Icon.getImageSource('md-menu', 30)
    ])
    .then(
        (icons) => {
            Navigation.startTabBasedApp({

                tabs: [
                    {
                        screen: "sdd.DiaryScreen",
                        label: "Diet diary",
                        title: "Diet Diary",
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
                        screen: "sdd.EstimatorScreen",
                        label: "Take a photo",
                        title: "Calorie Estimator",
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
                        screen: "sdd.SideDrawer"
                    }
                }
            });
        }
    )

}

export default startTabs;
