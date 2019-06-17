import React from 'react';

import { View, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';


const ResultSection = ({name, calories}) => {

    return (
        <View style = {styles.container}>
            <MainText>
                Item: { name }
            </MainText>
            <MainText>
                Calories: { calories }
            </MainText>
        </View>
    );
        
}

export default ResultSection;


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        borderWidth: 1,
        borderColor: 'black'
    }
})