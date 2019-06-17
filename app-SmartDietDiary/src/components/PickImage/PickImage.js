import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

    saveToDiary = () => {
        this.setState({ pickedImage : null });
        this.props.saveToDiary();
    }
    

    render() {


        return (
            <View style = {styles.container }>
                <View style = {styles.placeHolder}>
                    <TouchableNativeFeedback
                        onPress = {this.pickImageHandler}
                    >
                        {(this.state.pickedImage) ?
                            <Image source = {this.state.pickedImage} style = {styles.previewImage} />
                            :
                            <View style = {styles.icon}>
                                <Icon name = {'ios-camera'} size = {100} />
                            </View>
                            
                        }
                    </TouchableNativeFeedback>
                    
                </View>
                <View style = {styles.buttonContainer}>
                    { !this.props.isProcessing ? 
                            <Button 
                                onPress = {this.props.processImage}
                                disabled = {this.props.processDisabled}
                                color = {'orange'}
                                style = { styles.button }
                            >Process</Button>
                       
                            :
                            <ActivityIndicator></ActivityIndicator>
                        
                    }
                    <Button 
                        style = { styles.button}
                        color = {'#32CD32'}
                        textColor = { this.props.saveDisabled ? '#aaa' : 'white'}
                        onPress = {this.saveToDiary}
                        disabled = {this.props.saveDisabled}
                    >Save</Button>
                </View>
            </View>
        );
    }

}

export default PickImage;


const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: '45%',
        aspectRatio: 1
    },
    placeHolder: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        height: '79%',
        aspectRatio: 1
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }

})