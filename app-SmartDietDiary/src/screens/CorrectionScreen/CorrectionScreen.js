import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import EditableEntry from './EditableEntry';
import { getList } from '../../store/actions/otherAPI';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => dispatch(getList())
    }
}

class CorrectionScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);
        itemArrayState = [];
        itemArrayState.push(this.props.itemArray[0]);
        this.state = {
            items: itemArrayState
        }
    }

    componentDidMount() {
        this.props.getList();
    }

    addItem = () => {
        const items = this.state.items;
        items.push({ name: '', mass: 0, calories: 0 })
        this.setState({ items: items});
    }

    removeItem = (index) => {
        let items = this.state.items;
        items.splice(index, 1)
        this.setState({ items: items });
    }

    onAddToDiary = () => {

    }
    
    render() {

        let listOfItems = this.state.items.map((item, i) => {
            return (
                <EditableEntry key = {i} name = {item.name} calories = {item.calories} mass = {item.mass} itemIndex = {i} removeItem = {this.removeItem} />
            );
        })
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.subContainer}>
                    { listOfItems }
                </ScrollView>
                <View style = {styles.subContainer2}>
                    <Button style = {styles.button} onPress = {this.addItem}>Add new item</Button>
                    <Button style = {styles.button} onPress = {this.onAddToDiary}>Done</Button>
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