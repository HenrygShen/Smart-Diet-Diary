import React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { initDB, resetDB, getEntries } from '../../utility/database';
import DiaryEntry from './DiaryEntry';
import { getDDMMYY, getIndexOfDate } from './dateUtility';

const FLAG = 0;

export class DiaryScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount() {
        if (FLAG === 0) {
            initDB();
        }
        else {
            resetDB();
        }
        
        getEntries()
        .then(entries => {
            // console.log('entries', entries);
            let entriesWithKey = [];
            for (let i = 0; i < entries.length; i++) {

                let item = entries.item(i);
                let dateFormat = getDDMMYY(item.Date);
                let index = getIndexOfDate(dateFormat, entriesWithKey);
                /* See if entry for a certain day exists.
                    - If so, add to that group
                    - Otherwise make a new day
                */
                if (index === -1) {
                    item = {
                        items: [{
                            food: item.Food,
                            calories: item.Calories
                        }],
                        key: i.toString(),
                        Date: dateFormat
                    }
                    entriesWithKey.push(item);
                }
                else {
                    entriesWithKey[index].items.push({
                        food: item.Food,
                        calories: item.Calories
                    })
                }

                
            }
            console.log(entriesWithKey);
            this.setState({ entries: entriesWithKey });
        });
       
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

        let entries = this.state.entries.map((entry, index) => {
            return (
                <DiaryEntry items = {entry.items} date = {entry.Date} key = {entry.key} />
            );
        });
        return (
            <View>
                {/* <FlatList 
                    data = { this.state.entries}
                    renderItem = { (entry) => {
                        <DiaryEntry name = {entry.item.Food} calories = { entry.item.Calories} date = {entry.item.Date} key = {entry.item.key}/>
                    }}
                /> */}
                <ScrollView>
                    { entries }
                </ScrollView>
            </View>
        )
    }
}

export default DiaryScreen;