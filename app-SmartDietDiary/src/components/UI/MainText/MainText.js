import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = (props) => {

    return (
        <Text style = {[styles.text, props.style]}>
            {props.children}
        </Text>
    );
}

export default mainText;

const styles = StyleSheet.create({

    text: {
        color: 'black',
        backgroundColor: 'transparent'
    }
})