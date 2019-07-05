import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

class EditableEntry extends React.Component {


    render() {
        return (
            <View style = {styles.container}>
                <MainText>
                    New entry
                </MainText>
                <View style = {styles.inputContainer}>
                    <DefaultInput style = {styles.input} placeholder = {'Item'}/>
                    <DefaultInput style = {styles.input} placeholder = {'Mass in grams'}/>
                </View>
            </View>
        )
    }
}

export default EditableEntry;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    input: {
        width: '40%'
    }
})