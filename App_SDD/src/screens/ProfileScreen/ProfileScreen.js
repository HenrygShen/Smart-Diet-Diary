import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDetails } from '../../utility/database';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';


class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {
                age: null,
                height: null,
                weight: null
            },
            controls: {
                age: null,
                height: null,
                weight: null
            },
            editMode: false
        }
    }

    componentDidMount() {
        getDetails()
        .then(rows => {
            const details = rows.item(0);
            this.setState(prevState => {
                return {
                    ...prevState,
                    details: {
                        age: details.Age.toString(),
                        weight: details.Weight.toString(),
                        height: details.Height.toString()
                    }
                }
            })
        });
    }

    onToggleEdit = () => {
        this.setState({ editMode: !this.state.editMode});
    }

    render() {

        const { age, height, weight } = this.state.details;

        let mainContent;
        if (!this.state.editMode) {
            mainContent =                
            <View style = {styles.infoContainer}>
                <MainText style = {{fontSize: 25}}>Your details are as below</MainText>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Age: {age} years old</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Height: {height} CM</MainText>
                </View>
                <View style = {styles.inputContainer}>
                    <MainText style = {{fontSize: 15}}>Weight: {weight} KG</MainText>
                </View>
                <Button style = {{width: '50%', alignSelf: 'center'}} onPress = {this.onToggleEdit}>Edit</Button>
            </View>
        }
        else {
            mainContent = 
            <View style = {styles.infoContainer}>
                <MainText style = {{fontSize: 25}}>Edit information</MainText>
                <View style = {styles.inputContainer}>
                    <DefaultInput placeholder = 'Age' value = {this.state.controls.age} style = {{fontSize: 15}}/>
                </View>
                <View style = {styles.inputContainer}>
                    <DefaultInput placeholder = 'Height' value = {this.state.controls.height} style = {{fontSize: 15}}/>
                </View>
                <View style = {styles.inputContainer}>
                    <DefaultInput placeholder = 'Weight' value = {this.state.controls.weight} style = {{fontSize: 15}}/>
                </View>
                <View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button style = {{width: '38%'}} onPress = {this.onToggleEdit}>Save</Button>
                    <Button style = {{width: '38%'}} onPress = {this.onToggleEdit}>Cancel</Button>
                </View>
            </View>
        }
        return (
            /* Profile viewing mode */
            <View style = {styles.container}>
                {mainContent}
            </View>
        )
    }
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    infoContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        width: '100%'
    },
    inputContainer: {
        padding: 5
    }
})