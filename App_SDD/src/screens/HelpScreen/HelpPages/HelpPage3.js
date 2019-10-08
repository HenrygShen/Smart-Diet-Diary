import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

class HelpPage3 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image source = {{uri: 'https://i.imgur.com/yzuVyPI.png'}} style = {styles.image}/>
                </View>
                <View style = {styles.textContainer}>
                    <Text>3. Click on the 'Add to diary' button to add this entry to your diary.</Text>
                </View>
            </View>
        )
    }
}

export default HelpPage3;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        paddingTop: 10,
        height: 400
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    textContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    }
})