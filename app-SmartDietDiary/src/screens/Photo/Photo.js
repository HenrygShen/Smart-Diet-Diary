import React from 'react';

import { connect } from 'react-redux';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import PickImage from '../../components/PickImage/PickImage';
import MainText from '../../components/UI/MainText/MainText';
import Button from '../../components/UI/Button/Button';
import { processImage } from '../../store/actions/imageProcessor';
import { CLEAR_IMAGE_RESULT } from '../../store/constants';
import { uiStopLoading } from '../../store/actions/ui';



const mapStateToProps = (state) => {
    return {
        isLoading : state.ui.isLoading,
        imageState: state.image
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        processImage : (image) => dispatch(processImage(image)),
        clearResult: () => dispatch({type: CLEAR_IMAGE_RESULT}),
        stopLoading : () => dispatch(uiStopLoading())
    }
}

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

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidUpdate() {
        if (this.props.imageState.response === 0) {
            this.props.stopLoading();
            this.setState(prevState => {
                return {
                    ...prevState,
                    answer: this.props.imageState.result
                }
            });
            this.props.clearResult();
        }
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

    processImage = () => {

        this.props.processImage(this.state.controls.image.value.base64);
    }

    
    render() {
        


        let answerSection;
        
        if (this.state.answer) {
            answerSection = 
            <MainText>
                { this.state.answer }
            </MainText>
        }

        let mainSection =                 
        <Button 
            onPress = {this.processImage}
            style = { styles.button }
        >Process</Button>;
        
        if (this.props.isLoading) {
            mainSection = <ActivityIndicator></ActivityIndicator>
        }

        return (
            <View style = {styles.container}>
                <PickImage onImagePicked = {this.imagePickedHandler}/>
                { mainSection }
                { answerSection }
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen);

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex:1
    },
    button: {

    }
})