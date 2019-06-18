import React from 'react';
import { connect } from 'react-redux';

import { 
    View,
    StyleSheet
} from 'react-native';

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';

import startMainTabs from '../mainTabs/startMainTabs';

import { checkUser, insertData, insertUserData } from '../../utility/database';
import MainText from '../../components/UI/MainText/MainText';

class StartScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            step: 9,
            weight: null,
            height: null
        }
    }

    componentDidMount() {
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

    nextStep = () => {
        let step = this.state.step;
        if (step === 3) {
            insertUserData(this.state.weight, this.state.height)
            .then(
                (complete) => {
                    startMainTabs();
                }
            )
            
        }
        else {
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
                weight: parseInt(text)
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
                    Please input your weight.
                </MainText>
                <DefaultInput style = { styles.input} placeholder = { `Weight in KG's`} />
                <Button onPress = { this.nextStep }>Next</Button>
            </View>

        }
        else if (step === 3) {
            mainSection = 
            <View style = {styles.container}>
                <MainText>
                    Please input your height.
                </MainText>
                <DefaultInput style = { styles.input} placeholder = { `Height in metres`}/>
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
        justifyContent: 'space-around'
    },
    input: {
        backgroundColor: '#eee',
        width: '80%',
        borderWidth: 1,
        borderColor: 'black'
    }
})
