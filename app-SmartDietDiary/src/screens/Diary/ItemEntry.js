import React from 'react';

import { View, StyleSheet } from 'react-native';

import Button from '../../components/UI/Button/Button';
import MainText from '../../components/UI/MainText/MainText';

const entry = (props) => {
    return (
        <View style = {styles.container}>
            <View>
                <MainText>
                    Food: { props.food } 
                </MainText>
                <MainText>
                    Calories: { props.calories }
                </MainText>
            </View>
            <Button 
                color = {'red'} 
                textColor = {'white'} 
                style = {{borderColor : 'transparent'}}
                onPress = { () => { props.onDelete(props.ID)}}
            >Remove</Button>
        </View>
    )
}

export default entry;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderBottomColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
        marginBottom: 1
    }
})