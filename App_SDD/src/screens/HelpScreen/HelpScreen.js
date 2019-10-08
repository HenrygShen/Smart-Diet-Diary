import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HelpPage1 from './HelpPages/HelpPage1';
import HelpPage2 from './HelpPages/HelpPage2';
import Button from '../../components/UI/Button/Button';
import HelpPage3 from './HelpPages/HelpPage3';
import HelpPage4 from './HelpPages/HelpPage4';
import HelpPage5 from './HelpPages/HelpPage5';
import HelpPage6 from './HelpPages/HelpPage6';

class HelpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1
        }
    }

    step = (number) => {
        this.setState({ step: this.state.step+number });
    }

    render() {
        let mainContent;
        switch (this.state.step) {
            case 1:
                mainContent = <HelpPage1 />;
                break;
            case 2:
                mainContent = <HelpPage2 />
                break;
            case 3:
                mainContent = <HelpPage3 />;
                break;
            case 4:
                mainContent = <HelpPage4 />;
                break;
            case 5:
                mainContent = <HelpPage5 />;
                break;
            case 6:
                mainContent = <HelpPage6 />;
                break;
            default:
                mainContent = <HelpPage1 />;
                break;
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.contentContainer}>
                    {mainContent}   
                </View>
                <View style = {styles.buttonContainer}>
                    {this.state.step !== 1 ? 
                        <Button style = {styles.button} onPress = {() => {this.step(-1)}}>Previous</Button>
                        :
                        null
                    }
                    {this.state.step !== 6 ? 
                        <Button style = {styles.button} onPress = {() => {this.step(1)}}>Next</Button>
                        :
                        null
                    }
                </View>
            </View>
        )
    }
}

export default HelpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer:  {
        flex: 1,
        height: '90%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10%'
    },
    button: {
        height: '60%',
        width: '25%'
    }
})