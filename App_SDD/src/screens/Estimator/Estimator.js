import React from 'react';
import { View, StyleSheet, } from 'react-native';
import EstimatorNavBar from './EstimatorNavBar';

import { connect } from 'react-redux';

import PickImage from '../../components/PickImage/PickImage';
import ResultSection from '../../components/ResultSection/ResultSection';

import { processImage } from '../../store/actions/imageProcessor';
import { uiStopLoading } from '../../store/actions/ui';

import { CLEAR_IMAGE_RESULT, UPDATE_DIARY, CLEAR_LOCK } from '../../store/constants';

import { insertData } from '../../utility/database';

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
        updateDiary: () => dispatch({type: UPDATE_DIARY }),
        stopLoading : () => dispatch(uiStopLoading()),
        clearLock: () => dispatch({type: CLEAR_LOCK })
    }
}

class EstimatorScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <EstimatorNavBar toggleDrawer = {navigation.getParam('toggleDrawer')}/>
    });

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
    }

    componentDidMount() {
        this.props.navigation.setParams({ toggleDrawer: this.toggleDrawer });
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

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    }

    /* Gets base64 image from PickImage component */
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

    /* Clears state and calls API to estimate calories */
    processImage = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                answer: null
            }
        });
        this.props.processImage(this.state.controls.image.value.base64);
    }

    saveToDiary = () => {
        
        for (var i = 0; i < this.state.answer.length; i++) {
            const { name, calories } = this.state.answer[i];
            insertData(name, calories)
            .then(() => {
                this.props.clearLock();
                this.props.updateDiary();
            })
            .catch(() => {
                alert('Could not save to diary. Please try again');
            })
        }
        this.setState(prevState => {
            return {
                ...prevState,
                answer: null,
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


    pushCorrectionScreen = () => {
        let itemArray = [];
        let currentItem = {
            name: this.state.answer.name, 
            calories: this.state.answer.calories,
            mass: this.state.answer.mass
        }
        itemArray.push(currentItem);


        this.props.navigation.push('CorrectionScreen', {
            itemArray: itemArray,
            saveToDiary: this.saveCorrectionToDiary
        });
    }

    saveCorrectionToDiary = (items) => {
        for (let i = 0; i < items.length; i++) {
            const { name, calories} = items[i];
            insertData(name, calories)
            .then(() => {
                this.props.clearLock();
                this.props.updateDiary();
                this.setState(prevState => {
                    return {
                        ...prevState,
                        answer: null,
                        controls: {
                            ...prevState.controls,
                            image: {
                                value: null,
                                valid: false
                            }
                        }
                    }
                });
                alert(`${items.length} items saved.`);
            })
            .catch((e) => {
                console.log(e);
                alert('Could not save to diary. Please try again');
            })
        }
    }

    
    render() {
        return (
            <View style = {styles.container}>

                <PickImage 
                    onImagePicked = {this.imagePickedHandler} 
                    processDisabled = {this.state.controls.image.value === null}
                    saveDisabled = {this.state.answer === null}
                    processImage = {this.processImage}
                    isProcessing = {this.props.isLoading}
                    saveToDiary = {this.saveToDiary}
                />

                {/* Show results if done loading */}
                <ResultSection result={this.state.answer} pushCorrectionScreen = {this.pushCorrectionScreen}/>
                
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstimatorScreen);


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})