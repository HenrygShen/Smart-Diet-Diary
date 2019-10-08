import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

class HelpPage2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image source = {{uri: 'https://i.imgur.com/Czkz4ck.png'}} style = {styles.image}/>
                </View>
                <View style = {styles.textContainer}>
                    <Text>2. Click on the 'Get calories' button to process the image.</Text>
                </View>
            </View>
        )
    }
}

export default HelpPage2;

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