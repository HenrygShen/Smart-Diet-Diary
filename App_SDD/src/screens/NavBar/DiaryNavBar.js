import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import MainText from '../../components/UI/MainText/MainText';

class DiaryNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.subContainer}>
                    <MainText color = {'black'}>Test</MainText>
                </View>
            </View>
        )
    }
}


export default DiaryNavBar;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%'
    },
    imageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})