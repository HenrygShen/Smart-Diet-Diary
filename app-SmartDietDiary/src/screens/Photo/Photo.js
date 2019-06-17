import React from 'react';
import { View, StyleSheet, } from 'react-native';

import { connect } from 'react-redux';

import PickImage from '../../components/PickImage/PickImage';
import ResultSection from '../../components/ResultSection/ResultSection';

import { processImage } from '../../store/actions/imageProcessor';
import { uiStopLoading } from '../../store/actions/ui';

import { CLEAR_IMAGE_RESULT } from '../../store/constants';

import { insertData } from '../Diary/database';


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
            answer: {
                name: null,
                calories: null
            }
        }

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidUpdate() {
        if (this.props.imageState.response === 0) {
            this.props.stopLoading();
            this.setState(prevState => {
                return {
                    ...prevState,
                    answer: {
                        name: this.props.imageState.result,
                        calories: 95
                    }
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
        this.setState(prevState => {
            return {
                ...prevState,
                answer: {
                    name: null,
                    calories: null
                }
            }
        });

        this.props.processImage(this.state.controls.image.value.base64);
    }

    saveToDiary = () => {

        const { name, calories } = this.state.answer;

        //TODO
        // Save name and results to sqlite and clear thing
        insertData(name, calories);
        this.setState(prevState => {
            return {
                ...prevState,
                answer: {
                    name: null,
                    calories: null
                },
                controls: {
                    ...prevState.controls,
                    image: {
                        value: null,
                        valid: false
                    }
                }
            }
        })
        alert('Saved');
    }

    
    render() {
                       


        return (
            <View style = {styles.container}>

                <PickImage 
                    onImagePicked = {this.imagePickedHandler} 
                    buttonDisabled = {this.state.controls.image.value === null}
                    processImage = {this.processImage}
                    isProcessing = {this.props.isLoading}
                    saveToDiary = {this.saveToDiary}
                />

                {/* Show results if done loading */}
                <ResultSection name = {this.state.answer.name} calories = { this.state.answer.calories } />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen);

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})