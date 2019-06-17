import React from 'react';
import { Text, View } from 'react-native';
import { initDB, resetDB, getEntries } from '../../utility/database';
import DiaryEntry from './DiaryEntry';

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
        const entries = getEntries();
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
                <DiaryEntry />
            </View>
        )
    }
}

export default DiaryScreen;