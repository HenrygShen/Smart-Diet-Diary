import React from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../../components/UI/Button/Button';
import MainText from '../../components/UI/MainText/MainText';

const ResultSection = ({result, pushCorrectionScreen}) => {   

    let list;
    let mainContent;
    if (result === -1) {
        mainContent = 
        <View>
            <View style = {styles.subTextContainer}>
                <MainText>
                    Coin not detected in image.
                </MainText>
                <MainText>
                    Incorrect classification or missing an item? 
                </MainText>
                <MainText>
                    Click below
                </MainText>
                <View>
                    <Button onPress = { () => {pushCorrectionScreen() }} info>More</Button>
                </View>
            </View>
        </View>
    }
    else if (result === -2) {
        mainContent = 
        <View>
            
            <View style = {styles.subTextContainer}>
                <MainText>
                    Food item not detected in image.
                </MainText>
                <MainText>Incorrect classification or missing an item? </MainText>
                <MainText>
                    Click below
                </MainText>
                <View>
                    <Button onPress = { () => {pushCorrectionScreen() }} info>More</Button>
                </View>
            </View>
        </View>
    }
    else if (result === -3) {
        mainContent = 
        <View>
            
            <View style = {styles.subTextContainer}>
                <MainText>
                    Nothing detected in image.
                </MainText>
                <MainText>Incorrect classification or missing an item? </MainText>
                <MainText>
                    Click below
                </MainText>
                <View>
                    <Button onPress = { () => {pushCorrectionScreen() }} info>More</Button>
                </View>
            </View>
        </View>
    }
    else if (result !== null) {
        list = result.map((object, i) => { 
            return (
            <View key = {`${Math.random()} ${Math.random()}`}>
                <MainText>
                    Item: {object.name}
                </MainText>
                <MainText>
                    Calories: {object.calories.toFixed(0)}
                </MainText>
            </View>
            )
        });

        mainContent =                 
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
                    <Button onPress = { () => {pushCorrectionScreen() }} info>More</Button>
                </View>
            </View>
        </View>;
    }
    return (
        <View style = {styles.container}>
            {mainContent}
        </View>
    );
        
}

export default ResultSection;


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