import React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import MainText from '../UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';

class ResultScreen extends React.Component {  
    
    constructor(props) {
        super(props);
    }

    render() {
        
        const result = this.props.navigation.getParam('result');
        let list;
        if (result !== null) {
            list = result.map((object) => { 
                return (
                <View key = {`${Math.random()} ${Math.random()}`}>
                    <MainText>
                        Item: {object.name}
                    </MainText>
                    <MainText>
                        Calories: {object.calories}
                    </MainText>
                </View>
                )
            })
        }
        return (
            <View style = {styles.container}>
                { (result !== null) ? 
                    <View style = {styles.subContainer}>
                        <View style = {styles.subTextContainer}>
                            <ScrollView>
                                {list}
                            </ScrollView>
                        </View>
                        <View style = {styles.subTextContainer}>
                            <MainText>
                                Incorrect classification or missing an item? 
                            </MainText>
                            <MainText>
                                Click below
                            </MainText>
                            <View>
                                <Button onPress = { () => {this.props.navigation.getParam('pushCorrectionScreen') }} info>More</Button>
                            </View>
                        </View>
                    </View>
                :
                null
                }
            </View>
        );
        
    }
}

export default ResultScreen;


const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: 'black'
    },
    subContainer: {
        flex: 1,
        paddingTop: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    subTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})