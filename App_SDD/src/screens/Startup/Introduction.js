import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';

const intro = (props) => {

    let text = 'Hi, we see this is your first time using the app.';
    if (props.step === 1) {
        text = "We'll just need a few things from you.";
    }

    return (
        <View style = {props.style}>
            <MainText>
                { text }
            </MainText>
            <Button 
                style = {styles.button}
                textColor = 'white'
                onPress = { () => { props.nextStep() }}>Next</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#115293'
    }
})

export default intro;