import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import PickImage from '../../components/PickImage/PickImage';

import { TfImageRecognition } from 'react-native-tensorflow';

class PhotoScreen extends React.Component {

    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    constructor(props) {
        super(props);

        this.state = {
            controls: {
                image: {
                    value: null,
                    valid: false
                }
            }
        }

        /* Set up TF */  
        const tfImageRecognition = new TfImageRecognition({
            model: require('./../../assets/fruit.pb'),
            labels: labels('./../../assets/labels.txt'),
            imageMean: 117, // Optional, defaults to 117
            imageStd: 1 // Optional, defaults to 1
        });
        

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'open'
                });
            }
        }
    }

    imagePickedHandler = (image) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
        
    }

    processImage = async() => {
        // const results = await this.tfImageRecognition.recognize({
        //     image: this.state.image.uri,
        //     inputName: "input", //Optional, defaults to "input"
        //     inputSize: 224, //Optional, defaults to 224
        //     outputName: "output", //Optional, defaults to "output"
        //     maxResults: 3, //Optional, defaults to 3
        //     threshold: 0.1, //Optional, defaults to 0.1
        //   });
        // alert(results);
    }

    
    render() {

        return (
            <View>
                <PickImage onImagePicked = {this.imagePickedHandler}/>
                <Text>
                    Hi photo
                </Text>
                <Button title = 'Process' onPress = {this.processImage}/>
            </View>
        )
    }
}

export default PhotoScreen;