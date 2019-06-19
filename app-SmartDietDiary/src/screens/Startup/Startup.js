import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';

import startMainTabs from '../mainTabs/startMainTabs';

import { checkUser, initDB, resetDB, insertUserData } from '../../utility/database';
import MainText from '../../components/UI/MainText/MainText';
import RadioForm from 'react-native-simple-radio-button';
import HeadingText from '../../components/UI/HeadingText/HeadingText';


const FLAG = 0;

class StartScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            step: 9,
            weight: null,
            height: null,
            age: null,
            exercise: 0,
            gender: 0,
            calorieIntake: 0
        }
    }

    componentDidMount() {

        this.props.navigator.toggleNavBar({
            to: 'hidden',
            animated: false
        });

        if (FLAG === 0) {
            initDB();
            checkUser()
            .then(userDoesExists => {
                if (!userDoesExists) {
                    this.setState({ step: 0});
                }
                else{
                    startMainTabs();
                }
            })
        }
        else {
            resetDB();
        }  
    }

    nextStep = () => {
        let step = this.state.step;
        if (step === 7) {
            insertUserData(parseInt(this.state.weight), parseInt(this.state.height))
            .then(
                (complete) => {
                    startMainTabs();
                }
            )
            
        }
        else {
            if (step === 6) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        calorieIntake: this.calculateCalorieIntake()
                    }
                })
            }
            step++;
            this.setState({
                step: step
            })
        }
    }

    onWeightChange = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                weight: text
            }
        })
    }

    onHeightChange = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                height: text
            }
        })
    }

    onAgeChange = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                age: text
            }
        })
    }

    
    calculateCalorieIntake = () => {

        const { gender, age, weight, height, exercise } = this.state;


        let calorieIntake = 0;
        let BMR = 0;
        if (gender === 0) {
            BMR = 66 + (6.3 * 2.205 * weight) + (12.9/2.54 * height) - (6.8 * age);
        }
        else {
            BMR = 655 + (4.3 * 2.205 * weight) + (4.7/2.54 * height) - (4.7 * age) * 1.2;
        }
        switch(exercise) {
            /* sedentary */
            case 0:
                calorieIntake = BMR * 1.2;
                break;
            /* lightly active */
            case 1:
                calorieIntake = BMR * 1.375;
                break;
            /* moderately active */
            case 2:
                calorieIntake = BMR * 1.55;
                break;
            /* very active */
            case 3:
                calorieIntake = BMR * 1.725;
                break;
            /* extra active */
            case 4:
                calorieIntake = BMR * 1.9;
                break;
            default:
                calroieIntake = BMR * 1.2;
                break;
        }
        return calorieIntake;
        
    }

    render() {

        let mainSection;
        const { step} = this.state;
        if (step === 0) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Hi, we see this is your first time using the app.
                    
                </MainText>
                <Button onPress = { this.nextStep }>Next</Button>
            </View>
        }
        else if (step === 1){
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    We'll just need a few things from you.
                </MainText>
                <Button onPress = { this.nextStep }>Next</Button>
            </View>
        }
        else if (step === 2) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Please input your age.
                </MainText>
                <DefaultInput style = { styles.input} placeholder = { `Age`} onChangeText =  { (text) => { this.onAgeChange(text)}} keyboardType ={'numeric'}/>
                <Button onPress = { this.nextStep } disabled = { this.state.age === '' || this.state.age === null }>Next</Button>
            </View>


        }
        else if (step === 3) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Please enter your sex.
                </MainText>
                <RadioForm
                radio_props={[
                    {label: 'Male', value: 0 },
                    {label: 'Female', value: 1 }
                ]}
                initial={0}
                onPress={(value) => {this.setState({ gender: value})}}
                />
                <Button onPress = { this.nextStep }>Next</Button>
            </View>

        }
        else if (step === 4) {

            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Please input your height.
                </MainText>
                <DefaultInput style = { styles.input} placeholder = { `Height in centimetres`} onChangeText =  { (text) => { this.onHeightChange(text)}} keyboardType ={'numeric'}/>
                <Button onPress = { this.nextStep } disabled = { this.state.height === '' || this.state.height === null }>Next</Button>
            </View>
        }
        else if (step === 5) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Please input your weight.
                </MainText>
                <DefaultInput style = { styles.input} placeholder = { `Weight in kilograms`} onChangeText =  { (text) => { this.onWeightChange(text)}} keyboardType ={'numeric'}/>
                <Button onPress = { this.nextStep } disabled = { this.state.weight === '' || this.state.weight === null }>Next</Button>
            </View>
        }
        else if (step === 6) {
            mainSection = 
            <View style = {styles.container}>
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
                onPress={(value) => {this.setState({ exercise: value})}}
                />
                <Button onPress = { this.nextStep }>Next</Button>
            </View>
        }
        else if (step === 7) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    For reference, your recommended daily calorie intake is { this.state.calorieIntake }
                </MainText>
                <Button onPress = { this.nextStep }>Next</Button>
            </View> 
        }

        return (
            <View style = {styles.fullContainer}>
                { mainSection }
            </View>
        )
    }
}


export default connect(null, null)(StartScreen);

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#eee',
        width: '80%',
        borderWidth: 1,
        borderColor: 'black'
    }
})
