import React from 'react';
import { Text, View } from 'react-native';
import { initDB, resetDB } from './database';

const FLAG = 0;

export class DiaryScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        if (FLAG === 0) {
            initDB();
        }
        else {
            resetDB();
        }
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'open'
                });
            }
        }
    }

    render() {

        return (
            <View>
                <Text>
                    
                </Text>
            </View>
        )
    }
}

export default DiaryScreen;