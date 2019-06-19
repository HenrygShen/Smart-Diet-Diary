import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';

import ItemEntry from './ItemEntry';

export class DiaryEntry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let entries = this.props.items.map((entry, index) => {
            return (
                <ItemEntry food = {entry.food} calories = {entry.calories} key = {index} ID = { entry.ID} onDelete = {this.props.onDelete}/>
            )
        })

        /* Find total calories */
        const { items, recommendedCalories } = this.props;
        let total = Object.keys(items).reduce((accumulator, key) => {
            return accumulator + items[key].calories;
        }, 0);

        return (
            <View style = {styles.container}>
                <HeadingText>
                    <MainText>
                        { this.props.date }
                    </MainText>
                </HeadingText>
                { entries }
                <MainText>
                    Total calories for the day : { total }
                </MainText>
                <MainText>
                    Recommended calories for the day : { recommendedCalories }
                </MainText>
            </View>
        )
    }
}

export default DiaryEntry;

export const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10
    }
})