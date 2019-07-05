import React from 'react';
import { View, StyleSheet } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';

class EditableEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: (this.props.name) ? 'default' : 'edit',
            mass: this.props.mass,
            name: this.props.name,
            calories: this.props.calories,
            controls: {
                name: this.props.name,
                mass: this.props.mass,
                calories: this.props.calories
            }
        }
    }

    toggleMode = () => {
        this.setState({ mode: (this.state.mode==='default') ? 'edit' : 'default' });
    }

    onEditField = (text, key) => {
        const prevControlState = this.state.controls;
        let controlState = {};
        if (key === 'calories' || key === 'mass') {
            text = parseInt(text);
        }
        controlState[key] = text;
        let newControlState = Object.assign({}, prevControlState, controlState);
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    ...newControlState
                }
            }
        })
    }

    saveEdit = () => {

        this.setState(prevState => {
            this.props.saveEdit({
                ...prevState.controls
            }, this.props.itemIndex);
            return {
                mode: 'default',
                ...prevState.controls,
                controls: {
                    ...prevState.controls
                }
            }
        })

    }

    render() {

        let mainSection;
        if (this.state.mode === 'default') {
            mainSection =
            <View style = {styles.inputContainer}>
                <View style = {styles.subContainer}>
                    <MainText>Item: {this.state.name}</MainText>
                </View>
                <View style = {styles.subContainer}>
                    <MainText>Mass: {`${this.state.mass}g`}</MainText>
                </View>
                
            </View>
        }
        else {
            mainSection =
            <View style = {styles.inputContainer}>
                <DefaultInput style = {styles.input} value = {this.state.controls.name} onChangeText = {(text) => { this.onEditField(text, 'name')}} placeholder = {'Item'}/>
                <DefaultInput style = {styles.input} value = {`${this.state.controls.mass}`} onChangeText = {(text) => { this.onEditField(text, 'mass')}} placeholder = {'Mass in grams'}/>
            </View>
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.marginContainer}>
                    <MainText>
                        {this.props.itemIndex + 1}
                    </MainText>
                    {mainSection}
                    <View style = {(this.state.mode === 'default') ? styles.buttonContainer : styles.reverseButtonContainer}>
                        <Button style = {styles.button} onPress = {this.toggleMode}>{(this.state.mode === 'default') ? 'Edit' : 'Cancel edit'}</Button>
                        {(this.state.mode === 'default') ?
                            <Button style = {styles.button} onPress = { () => { this.props.removeItem(this.props.itemIndex)}}>Remove item</Button>
                            :
                            <Button style = {styles.button} onPress = { () => { this.saveEdit() }}>Save</Button>
                        }
                        
                    </View>

                </View>

            </View>
        )
    }
}

export default EditableEntry;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
    },
    reverseButtonContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    marginContainer: {
        flex: 1,
        marginLeft: 5
    },
    subContainer: {
        flex: 1
    },
    input: {
        width: '40%'
    }
})