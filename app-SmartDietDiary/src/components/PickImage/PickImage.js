import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Button from '../UI/Button/Button';
import ImagePicker from 'react-native-image-picker';

class PickImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pickedImage: null
        }
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Pick an image'}, res => {
            if (res.didCancel) {
                console.log('User cancelled');
            }
            else if (res.error) {
                console.log('Error', res.error);
            }
            else {
                this.setState({
                    pickedImage: { uri: res.uri }
                })
                this.props.onImagePicked({ uri: res.uri, base64: res.data });
            }
        });
    }
    

    render() {

        return (
            <View style = {styles.container }>
                <View style = {styles.placeHolder}>
                    <Image source = {this.state.pickedImage} style = {styles.previewImage} />
                </View>
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button onPress = {this.pickImageHandler}>Pick image</Button>
                    </View>
                    { !this.props.isProcessing ? 
                        <View style = {styles.button}>
                            <Button 
                                onPress = {this.props.processImage}
                                disabled = {this.props.buttonDisabled}
                            >Process</Button>
                        </View>
                            :
                            <ActivityIndicator></ActivityIndicator>
                        
                    }

                </View>

            </View>
        );
    }

}

export default PickImage;


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    placeHolder: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})