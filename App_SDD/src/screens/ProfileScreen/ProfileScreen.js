import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDetails } from '../../utility/database';
import MainText from '../../components/UI/MainText/MainText';

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
            }
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
                        age: details.Age,
                        weight: details.Weight,
                        height: details.Height
                    }
                }
            })
        });
    }

    render() {

        const { age, height, weight } = this.state.details;

        return (
            <View style = {styles.container}>
                <View style = {styles.infoContainer}>
                    <MainText>
                        Profile screen
                    </MainText>
                    <View style = {styles.inputContainer}>
                        <MainText style = {{fontSize: 20}}>Age: {age} years old</MainText>
                    </View>
                    <View style = {styles.inputContainer}>
                        <MainText style = {{fontSize: 20}}>Height: {height} CM</MainText>
                    </View>
                    <View style = {styles.inputContainer}>
                        <MainText style = {{fontSize: 20}}>Weight: {weight} KG</MainText>
                    </View>
                </View>
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
        flex: 1
    },
    inputContainer: {
        padding: 5
    }
})