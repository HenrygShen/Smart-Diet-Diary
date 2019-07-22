import React from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import { Button, Text } from 'native-base';

import { checkUser, initDB, resetDB, insertUserData } from '../../utility/database';

import Introduction from './Introduction';
import AskQuestions from './AskQuestions';
import { calculateCalorieIntake } from './utility/calorieCalculator';
import { loadCalories } from '../../store/actions/user';

const FLAG = 0;

export const mapDispatchToProps = (dispatch) => {
    return {
        loadCalories: (calories) => dispatch(loadCalories(calories))
    }
}

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

        if (FLAG === 0) {
            initDB()
            .then(() => {
                checkUser()
                .then(user => {
                    if (user.length !== 0) {
                        if (user.CalorieIntake === -1) {
                            alert('Something went wrong when fetching calories.');
                        }
                        else {
                            this.props.loadCalories(user.item(0).CalorieIntake);
                            this.props.navigation.navigate('MainTabs');
                        }
                    }
                    else {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                step: 0
                            }
                        })
                    }
                })
            })

        }
        else {
            resetDB();
        }  
    }


    nextStep = () => {
        if (this.state.step === 7) {
            insertUserData(parseInt(this.state.weight), parseInt(this.state.height), parseInt(this.state.age), this.state.calorieIntake)
            .then((complete) => {
                this.props.loadCalories(this.state.calorieIntake);
                this.props.navigation.navigate('MainTabs');
            })
        }
        else {
            if (this.state.step === 6) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        calorieIntake: calculateCalorieIntake(this.state)
                    }
                })
            }
            this.setState({
                step: ++this.state.step
            })
        }
    }


    onInputChange = (input, type) => {
        let object = { };
        object[type] = input;
        const newState = Object.assign({}, this.state, object);
        this.setState(newState);
    } 


    render() {

        const { step} = this.state;
        let mainSection;

        if (step === 0 || step === 1) {
            mainSection = 
            <Introduction style = {styles.container} nextStep = {this.nextStep} step = { step } />
        }
        else if (step === 2 || step === 3 || step === 4 || step === 5 || step === 6) {
            mainSection = 
            <AskQuestions 
                style = {styles.container} inputStyle = {styles.input} 
                step = {step} 
                nextStep = {this.nextStep} 
                state = {this.state} 
                onInputChange = {this.onInputChange}
            />
        }
        else if (step === 7) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    For reference, your recommended daily calorie intake is { this.state.calorieIntake }
                </MainText>
                <Button onPress = { this.nextStep }><Text>Next</Text></Button>
            </View> 
        }

        return (
            <View style = {styles.fullContainer}>
                { mainSection }
            </View>
        )
    }
}


export default connect(null, mapDispatchToProps)(StartScreen);

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
