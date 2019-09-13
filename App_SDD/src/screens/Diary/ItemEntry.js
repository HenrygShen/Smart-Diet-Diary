import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Button from '../../components/UI/Button/Button';
import MainText from '../../components/UI/MainText/MainText';

class ItemEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayMode: 'Meal'
        }
    }

    toggleMode = () => {
        if (this.state.displayMode === 'Meal') {
            this.setState({ displayMode : 'calories'});
        }
        else {
            this.setState({ displayMode : 'Meal'});
        }
    }

    render() {

        const { food, calories, ID } = this.props;

        let mainSection;

        if (this.state.displayMode === 'Meal') {
            mainSection = `Meal: ${food}`;
        }
        else {
            mainSection = `Calories: ${calories}`;
        }
        return (

            <View style = {styles.container}>
                <TouchableOpacity onPress = {this.toggleMode} style = {styles.textContainer}>
                    <MainText style = {styles.text}>
                        { mainSection}
                    </MainText>
                </TouchableOpacity>
                <Button 
                    onPress = { () => { this.props.onDelete(ID)}}
                    style = {styles.removeButton}
                    textColor = 'white'
                >
                    Remove
                </Button>
            </View>

        )
    }

}

export default ItemEntry;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
        marginBottom: 1,
        padding: 2
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 20
    },
    removeButton: {
        backgroundColor: 'red',
        borderWidth: 0,
        borderRadius: 0
    }
    
})