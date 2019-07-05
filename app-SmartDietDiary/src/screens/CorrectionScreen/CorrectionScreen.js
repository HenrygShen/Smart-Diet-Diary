import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import EditableEntry from './EditableEntry';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class CorrectionScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);
        this.state = {
            extraItems: []
        }
    }

    addItem = () => {
        const items = this.state.extraItems;
        items.push({ name: null, mass: null })
        this.setState({ extraItems: items});
    }

    onAddToDiary = () => {

    }
    
    render() {

        let listOfExtraItems = this.state.extraItems.map((item, i) => {
            return (
                <EditableEntry key = {i} />
            );
        })
        return (
            <View style = {styles.container}>
                <ScrollView style = {styles.subContainer}>
                    { listOfExtraItems }
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