import React from 'react';
import { connect } from 'react-redux';
import { View, Keyboard, StyleSheet, ScrollView } from 'react-native';

import EditableEntry from './EditableEntry/EditableEntry';
import Button from '../../components/UI/Button/Button';
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

    static navigationOptions = {
        tabBarVisible: false
    };

    constructor(props) {
        super(props);
        itemArrayState = [];
        const paramsItemArray = this.props.navigation.getParam('itemArray');
        for (var i = 0; i < paramsItemArray.length; i++) {
            itemArrayState.push({
                name: paramsItemArray[i].name,
                calories: paramsItemArray[i].calories,
                mass: paramsItemArray[i].mass,
                type: 'list'
            });
        }

        this.state = {
            items: itemArrayState
        }
    }

    componentDidMount() {
        this.props.getList();
    }


    componentDidUpdate() {
        if (this.props.calorieResults !== null && this.props.resultsCleared === 0) {
            this.props.navigation.getParam('saveToDiary')(this.props.calorieResults['list']);
            this.props.clearCalorieResults();
            this.props.navigation.goBack();
        }
    }

    addItem = () => {
        const items = this.state.items;
        items.push({ name: '', mass: 0, calories: 0, type: 'custom' })
        this.setState({ items: items});
    }

    removeItem = (index) => {
        let newItems = this.state.items;
        newItems.splice(index, 1);
        this.setState({ items: newItems });
    }

    onAddToDiary = () => {
        if (this.hasInvalidItems()) {
            alert('Invalid items found in list');
        }
        else {
            this.props.calculateCalories(this.state.items);
        }
    }

    saveEdit = (item, index) => {
        let items = this.state.items;
        items[index] = item;
        this.setState({ items: items });
    }

    hasInvalidItems = () => {
        const items = this.state.items;
        if (items.length === 0) {
            return true;
        }
        else {
            for (let i = 0; i < items.length; i++) {
                if (items[i].name === '' || (items[i].mass === 0 && items[i].calories === 0)) {
                    return true;
                }
            }
            return false;
        }
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
                    type = {item.type}
                />
            );
        })
        return (
            <View style = {styles.container}>
                <ScrollView>
                    { listOfItems }
                </ScrollView>
                <View style = {styles.subContainer2}>
                    <View style = {styles.buttonWrapper}><Button onPress = {this.addItem}>Add new item</Button></View>
                    
                    <View style = {styles.buttonWrapper}><Button onPress = {this.onAddToDiary}>Done</Button></View>
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
    subContainer2: {
        flexDirection: 'row',
        height: '10%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonWrapper: {
        width: '35%'
    }
})