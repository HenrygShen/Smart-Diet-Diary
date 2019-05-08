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
            },
            answer: null
        }

        this.tfImageRecognition = new TfImageRecognition({
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
        fetch('http://192.168.1.73:3001/processImage', {
            method :'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                image: this.state.controls.image.value.base64
            })
        })
        .then(res => res.json())
        .then((res) => {
            alert(res.answer);
            this.setState(prevState => {
                return {
                    ...prevState,
                    answer: res['answer']
                }
            });
            
        })


    }

    
    render() {

        return (
            <View>
                <PickImage onImagePicked = {this.imagePickedHandler}/>
                <Text>
                    { this.state.answer }
                </Text>
                <Button title = 'Process' onPress = {this.processImage}/>
            </View>
        )
    }
}

export default PhotoScreen;