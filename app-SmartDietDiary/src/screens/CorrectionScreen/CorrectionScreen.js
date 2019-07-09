import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import EditableEntry from './EditableEntry';
import { getList, calculateCalories } from '../../store/actions/otherAPI';
import { CLEAR_CAL_RESULTS } from '../../store/constants';

const mapStateToProps = (state) => {
    return {
        list: state.otherAPI.list,
        calorieResults: state.otherAPI.calorieResults,
        resultsCleared: state.otherAPI.resultsCleared
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => dispatch(getList()),
        calculateCalories: (list) => dispatch(calculateCalories(list)),
        clearCalorieResults: () => dispatch({ type: CLEAR_CAL_RESULTS })
    }
}

class CorrectionScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);
        itemArrayState = [];
        itemArrayState.push({
            name: this.props.itemArray[0].name,
            calories: this.props.itemArray[0].calories,
            mass: this.props.itemArray[0].mass,
            type: 'list'
        });
        this.state = {
            items: itemArrayState
        }
    }

    componentDidMount() {
        this.props.getList();
    }

    componentDidUpdate() {
        if (this.props.calorieResults !== null && this.props.resultsCleared === 0) {
            this.props.saveToDiary(this.props.calorieResults['list']);
            this.props.clearCalorieResults();
            this.props.navigator.pop();
        }
    }

    addItem = () => {
        const items = this.state.items;
        items.push({ name: '', mass: 0, calories: 0 })
        this.setState({ items: items});
    }

    removeItem = (index) => {
        let newItems = this.state.items;
        newItems.splice(index, 1);
        this.setState({ items: newItems });
    }

    onAddToDiary = () => {
        this.props.calculateCalories(this.state.items);
    }

    saveEdit = (item, index) => {
        let items = this.state.items;
        items[index] = item;
        this.setState({ items: items });
    }
    
    render() {

        let listOfItems = this.state.items.map((item, i) => {
            return (
                <EditableEntry 
                    key = {`${Math.random()}`} 
                    name = {item.name} 
                    calories = {item.calories} 
                    mass = {item.mass} 
                    itemIndex = {i} 
                    removeItem = {this.removeItem} 
                    saveEdit = {this.saveEdit}
                    list = {this.props.list}
                />
            );
        })
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.subContainer}>
                    { listOfItems }
                </ScrollView>
                <View style = {styles.subContainer2}>
                    <Button style = {styles.button} onPress = {this.addItem}>Add new item</Button>
                    <Button style = {styles.button} onPress = {this.onAddToDiary} disabled = {this.state.items.length === 0}>Done</Button>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorrectionScreen);


const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        flexDirection: 'column'
    },
    subContainer: {
        height: '90%',
    },
    subContainer2: {
        flexDirection: 'row',
        height: '10%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})