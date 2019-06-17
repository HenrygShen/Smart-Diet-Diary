import React from 'react';
import { Text, View } from 'react-native';

export class DiaryEntry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <Text>
                    Entry
                </Text>
            </View>
        )
    }
}

export default DiaryEntry;