import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Alert } from 'react-native';
import { getEntries, removeItemWithKey } from '../../utility/database';
import DiaryEntry from './DiaryEntry';
import { getDDMMYY, getIndexOfDate } from './dateUtility';
import { SET_LOCK } from '../../store/constants';
import DiaryNavBar from '../NavBar/DiaryNavBar';

const mapStateToProps = (state) => {
    return {
        diaryDidUpdate : state.diary.count,
        isLocked: state.diary.locked,
        recommendedCalories: state.user.recommendedCalories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        lockDiary: () => dispatch({type : SET_LOCK })
    }
}


class DiaryScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <DiaryNavBar toggleDrawer = {navigation.getParam('toggleDrawer')}/>
    });

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ toggleDrawer: this.toggleDrawer });
        this.updateEntries();
    }
    
    componentDidUpdate() {
        if (!this.props.isLocked) {
            this.updateEntries();
            this.props.lockDiary();
        }
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }

    onDelete = (ID) => {

        Alert.alert(
            '',
            'Remove this meal entry from your diary?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { text: 'Yes', onPress: () => {
                    removeItemWithKey(ID)
                    .then((actionCompleted) => {
                        this.updateEntries();
                    })
                    .catch(e => {
                        alert('Something went wrong. Please try again.');
                    })
                }},
                {cancelable: false}
            ]
        )
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
                            ID: item.ID
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
                        ID: item.ID
                    })
                }
            }
            this.setState({ entries: entriesWithKey });
        });
    }

    render() {

        let entries = this.state.entries.map((entry) => {
            return (
                <DiaryEntry items = {entry.items} date = {entry.Date} key = {entry.key} onDelete = {this.onDelete} recommendedCalories = {this.props.recommendedCalories} />
            );
        });
        return (
            <View>
                <ScrollView>
                    { entries }
                </ScrollView>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);