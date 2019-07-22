import React from 'react';
import { 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    View, 
    StyleSheet,
    Platform 
} from 'react-native';

import MainText from '../MainText/MainText';

const button = (props) => {

    const content = (
        <View style = {[styles.button, {backgroundColor: props.color}, (props.disabled) ? styles.disabled : null , props.style]}>
            <MainText style = {[styles.text, (props.disabled) ? styles.disabledText : null, { color : props.textColor}]}>
                { props.children }
            </MainText>
        </View>
    );

    if (props.disabled) {
        return content;
    }

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress = {props.onPress}>
                { content }
            </TouchableNativeFeedback>
        );
    }
    else {
        return (
            <TouchableOpacity onPress = {props.onPress}>
                { content }
            </TouchableOpacity>
        );
    }
}

export default button;

const styles = StyleSheet.create({

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    text: {
        color: 'black'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
})