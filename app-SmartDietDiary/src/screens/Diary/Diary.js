import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView } from 'react-native';
import { initDB, resetDB, getEntries, removeItemWithKey } from '../../utility/database';
import DiaryEntry from './DiaryEntry';
import { getDDMMYY, getIndexOfDate } from './dateUtility';
import { SET_LOCK } from '../../store/constants';

const FLAG = 0;

const mapStateToProps = (state) => {
    return {
        diaryDidUpdate : state.diary.count,
        isLocked: state.diary.locked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        lockDiary: () => dispatch({type : SET_LOCK })
    }
}

class DiaryScreen extends React.Component {

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
        this.updateEntries();
    }

    componentDidUpdate() {
        
        if (!this.props.isLocked) {
            this.updateEntries();
            this.props.lockDiary();
        }
        
    }

    onDelete = (ID) => {

        alert(ID);
        removeItemWithKey(ID)
        .then((actionCompleted) => {
            alert('Item removed');
            this.updateEntries();
        })
        .catch(e => {
            alert('Something went wrong. Please try again.');
        })
        
    }

    updateEntries = () => {
        getEntries()
        .then(entries => {
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
                            calories: item.Calories,
                            // In this context, date is exact epoch time - can act as unique ID
                            ID: item.Date
                        }],
                        key: i.toString(),
                        Date: dateFormat
                    }
                    entriesWithKey.push(item);
                }
                else {
                    entriesWithKey[index].items.push({
                        food: item.Food,
                        calories: item.Calories,
                        ID: item.Date
                    })
                }
            }
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

        let entries = this.state.entries.map((entry) => {
            return (
                <DiaryEntry items = {entry.items} date = {entry.Date} key = {entry.key} onDelete = {this.onDelete}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);