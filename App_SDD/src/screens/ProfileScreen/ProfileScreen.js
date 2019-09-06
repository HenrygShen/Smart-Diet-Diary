import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import { getDetails, saveUserData } from '../../utility/database';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import { calculateCalorieIntake } from '../Startup/utility/calorieCalculator';
import { loadCalories } from '../../store/actions/user';

const radio_props = [
    {label: 'Little to no exercise', value: 0 },
    {label: 'Exercise 1 - 3 days/week', value: 1 },
    {label: 'Exercise 3 - 5 days/week', value: 2 },
    {label: 'Exercise 6 - 7 days/week', value: 3 },
    {label: 'Very hard exercise all week', value: 4 }
]

export const mapDispatchToProps = (dispatch) => {
    return {
        loadCalories: (calories) => dispatch(loadCalories(calories))
    }
}

class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {
                age: null,
                height: null,
                weight: null,
                gender: null,
                activity: {
                    label: '',
                    value: 0
                }
            },
            controls: {
                age: null,
                height: null,
                weight: null,
                activity: null
            },
            editMode: false
        }
    }

    componentDidMount() {
        this.loadDetails();
    }

    loadDetails = () => {
        getDetails()
        .then(rows => {
            const details = rows.item(0);
            this.setState(prevState => {
                return {
                    controls: {
                        age: details.Age.toString(),
                        weight: details.Weight.toString(),
                        height: details.Height.toString(),
                        activity: {
                            label: radio_props[parseInt(details.Activity)].label,
                            value: radio_props[parseInt(details.Activity)].value
                        }
                    },
                    details: {
                        age: details.Age.toString(),
                        weight: details.Weight.toString(),
                        height: details.Height.toString(),
                        activity: {
                            label: radio_props[parseInt(details.Activity)].label,
                            value: radio_props[parseInt(details.Activity)].value
                        },
                        gender: details.Gender
                    }  
                }
            })
        });
    }

    onToggleEdit = () => {
        this.setState({ editMode: !this.state.editMode});
    }

    onChangeText = (text, type) => {
        this.setState(prevState => { 
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    [type]: text
                }
            }   
        });
    }

    onUpdateActivity = (value) => {
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    activity: {
                        value: value,
                        label: radio_props[value]
                    }
                }
            }
        })
    }

    onSave = () => {
        const state = {
            ...this.state.controls,
            gender: this.state.gender,
            exercise: this.state.controls.activity.value
        }
        calorieIntake = calculateCalorieIntake(state);
        saveUserData(this.state.controls.weight, this.state.controls.height, this.state.controls.age, this.state.controls.activity.value, calorieIntake)
        .then(() => {
            this.onToggleEdit();
            this.loadDetails();
            this.props.loadCalories(calorieIntake);
            alert('Details saved');
        });
        
    }

    render() {

        const { age, height, weight, activity } = this.state.details;

        let mainContent;
        if (!this.state.editMode) {
            mainContent =                
            <View style = {styles.infoContainer}>
                <View style = {{marginBottom: 20}}>
                    <MainText style = {{fontSize: 25}}>Your details are as below</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Age: {age} years old</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Height: {height} CM</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Weight: {weight} KG</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Activity: {activity.label}</MainText>
                </View>
                <Button style = {{width: '50%', marginTop: 20, alignSelf: 'center'}} onPress = {this.onToggleEdit}>Edit</Button>
            </View>
        }
        else {
            mainContent = 
            <ScrollView contentContainerStyle = {styles.infoContainer}>
                <MainText style = {{fontSize: 25}}>Edit information</MainText>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Age</MainText>
                    <DefaultInput 
                        placeholder = 'Age' 
                        onChangeText = { (text) => this.onChangeText(text, 'age')} 
                        value = {this.state.controls.age} 
                        style = {{fontSize: 15}} 
                        keyboardType ={'numeric'}
                        defaultValue = {this.state.controls.age}
                    />
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Height (CM)</MainText>
                    <DefaultInput 
                        placeholder = 'Height' 
                        onChangeText = { (text) => this.onChangeText(text, 'height')}  
                        value = {this.state.controls.height} 
                        style = {{fontSize: 15}} 
                        keyboardType ={'numeric'}
                        defaultValue = {this.state.controls.height}
                    />
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Weight (KG)</MainText>
                    <DefaultInput 
                        placeholder = 'Weight' 
                        onChangeText = { (text) => this.onChangeText(text, 'weight')}  
                        value = {this.state.controls.weight} 
                        style = {{fontSize: 15}} 
                        keyboardType ={'numeric'}
                        defaultValue = {this.state.controls.weight}
                    />
                </View>
                <View>
                <RadioForm
                    radio_props={[
                        {label: 'Little to no exercise', value: 0 },
                        {label: 'Exercise 1 - 3 days/week', value: 1 },
                        {label: 'Exercise 3 - 5 days/week', value: 2 },
                        {label: 'Exercise 6 - 7 days/week', value: 3 },
                        {label: 'Very hard exercise all week', value: 4 }
                    ]}
                    initial={activity.value}
                    onPress={(value) => { this.onUpdateActivity(value)}}
                    />
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                    <Button style = {{width: '38%'}} onPress = {this.onSave}>Save</Button>
                    <Button style = {{width: '38%'}} onPress = {this.onToggleEdit}>Cancel</Button>
                </View>
            </ScrollView>
        }
        return (
            /* Profile viewing mode */
            <View style = {styles.container}>
                {mainContent}
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%'
    },
    infoContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 40
    },
    inputContainer: {
        padding: 5
    }
})