import React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text } from 'native-base';
import MainText from '../../components/UI/MainText/MainText';

const ResultSection = ({result, pushCorrectionScreen}) => {   

    let list;
    if (result !== null) {
        list = result.map((object, i) => { 
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
                            <Button onPress = { () => {pushCorrectionScreen() }} info><Text>More</Text></Button>
                        </View>
                    </View>
                </View>
            :
            null
            }

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