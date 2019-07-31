import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MainText = (props) => {

    return (
        <Text style = {[styles.text, props.style]}>
            {props.children}
        </Text>
    );
}

export default MainText;

const styles = StyleSheet.create({

    text: {
        color: 'black',
        backgroundColor: 'transparent',
        fontFamily: 'sans-serif'
    }
})