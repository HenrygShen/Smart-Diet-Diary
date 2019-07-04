import React from 'react';

import { View, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';

const ResultSection = ({name, calories}) => {   
    return (
        <View style = {styles.container}>
            { (name !== null) ? 
                <View style = {styles.subContainer}>
                    <MainText>
                        Item: { name }
                    </MainText>
                    <MainText>
                        Calories: { calories }
                    </MainText>
                    <MainText>
                        Incorrect classification or missing an item? 
                    </MainText>
                    <MainText>
                        Click below
                    </MainText>
                    <Button>More</Button>
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
        justifyContent: 'center'
    }
})