import React from 'react';

import { View } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import RadioForm from 'react-native-simple-radio-button';

const askQuestions = (props) => {

    const { step } = props;

    let mainSection;

    if (step === 2) {
        mainSection = 
        <View style = {props.style}>
            <MainText>
                Please enter your age (to the closest whole number).
            </MainText>
            <DefaultInput style = { props.inputStyle} placeholder = { `Age`} onChangeText = { (text) => { props.onInputChange(text, 'age')}} keyboardType ={'numeric'}/>
            <Button 
                onPress = { () => { props.nextStep() }} 
                disabled = { props.state.age === '' || props.state.age === null }
            >Next</Button>
        </View>
    }
    else if (step === 3) {
        mainSection = 
        <View style = {props.style}>
            <MainText>
                Please enter your sex.
            </MainText>
            <RadioForm
            radio_props={[
                {label: 'Male', value: 0 },
                {label: 'Female', value: 1 }
            ]}
            initial={0}
            onPress={(value) => { props.onInputChange(value, 'gender')}}
            />
            <Button onPress = { () => { props.nextStep() }}>Next</Button>
        </View>
    }
    else if (step === 4) {
        mainSection = 
        <View style = {props.style}>
            <MainText>
                Please input your height (CM).
            </MainText>
            <DefaultInput style = { props.inputStyle} placeholder = { `Height in centimetres`} onChangeText =  { (text) => { props.onInputChange(text, 'height')}} keyboardType ={'numeric'}/>
            <Button 
                onPress = { () => { props.nextStep() }} 
                disabled = { props.state.height === '' || props.state.height === null }
            >Next</Button>
        </View>
    }
    else if (step === 5) {
        mainSection = 
        <View style = {props.style}>
            <MainText>
                Please input your weight (KG).
            </MainText>
            <DefaultInput  style = { props.inputStyle} placeholder = { `Weight in kilograms`} onChangeText =  { (text) => { props.onInputChange(text, 'weight')}} keyboardType ={'numeric'}/>
            <Button 
                onPress = { () => { props.nextStep() }} 
                disabled = { props.state.weight === '' || props.state.weight === null }
            >Next</Button>
        </View>
    }
    else {
        mainSection = 
        <View style = {props.style}>
            <MainText>
                Please describe your exercise habits.
            </MainText>
            <RadioForm
            radio_props={[
                {label: 'Little to no exercise', value: 0 },
                {label: 'Exercise 1 - 3 days/week', value: 1 },
                {label: 'Exercise 3 - 5 days/week', value: 2 },
                {label: 'Exercise 6 - 7 days/week', value: 3 },
                {label: 'Very hard exercise all week', value: 4 }
            ]}
            initial={0}
            onPress={(value) => { props.onInputChange(value, 'exercise')}}
            />
            <Button onPress = { () => { props.nextStep() } }>Next</Button>
        </View>
    }

    return mainSection
}

export default askQuestions;