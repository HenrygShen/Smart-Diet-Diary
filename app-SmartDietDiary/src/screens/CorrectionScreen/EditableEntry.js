import React from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';

import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import Button from '../../components/UI/Button/Button';
import RadioForm from 'react-native-simple-radio-button';

class EditableEntry extends React.Component {

    constructor(props) {
        super(props);
        let list = [];
        for (let i = 0; i < props.list.length; i++) {
            list.push({
                label: props.list[i],
                value: i
            })
        }
        this.state = {
            mode: (this.props.name) ? 'default' : 'edit',
            editMode: 'default',
            mass: this.props.mass,
            name: this.props.name,
            calories: this.props.calories,
            controls: {
                name: this.props.name,
                mass: this.props.mass,
                calories: this.props.calories
            },
            list: list
        }
        
    }

    toggleMode = () => {
        this.setState(prevState => {
            return { 
                ...prevState,
                mode: (prevState.mode==='default') ? 'edit' : 'default' 
            }
        });
    }

    setEditMode = (mode) => {
        this.setState(prevState => {
            return { 
                ...prevState,
                editMode: mode
            }
        });
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

    saveEdit = (type) => {

        this.setState(prevState => {
            this.props.saveEdit({
                ...prevState.controls,
                type: type
            }, this.props.itemIndex);
            return {
                mode: 'default',
                editMode: 'default',
                ...prevState.controls,
                controls: {
                    ...prevState.controls
                }
            }
        })

    }

    onRadioInputChange = (value) => {
        let controlState = {};
        controlState = { name: this.state.list[value].label};
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    ...controlState
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
        /* In edit mode */
        else {
            if (this.state.editMode === 'default') {
                mainSection =
                <View style = {styles.inputContainer}>
                    <View style = {{flex:1, flexDirection: 'row', justifyContent: 'space-around', margin: 20}}>
                        <Button style = {styles.itemEditButton} onPress = { () => { this.setEditMode('list')}}>Choose from list</Button>
                        <Button style = {styles.itemEditButton} onPress = { () => { this.setEditMode('custom')}}>Add your own item</Button>
                    </View>
                </View>
            }
            else if (this.state.editMode === 'list') {
                mainSection = 
                <Modal visible = {this.state.editMode === 'list'} onRequestClose = {() => {this.setEditMode('default')}}>
                    <View style = {{flex: 1, justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
                        <View>
                            <HeadingText>
                                <MainText>
                                    Choose your item
                                </MainText>
                            </HeadingText>
                        </View>
                        <ScrollView style = {{ width: '60%', maxHeight: '50%'}}>
                            <RadioForm
                            radio_props={this.state.list}
                            buttonColor={'orange'}
                            selectedButtonColor = {'orange'}
                            initial={0}
                            onPress={(value) => { this.onRadioInputChange(value)}}
                            />
                        </ScrollView>
                        <View>
                            <DefaultInput 
                                style = {styles.input} 
                                onChangeText = {(text) => { this.onEditField(text, 'mass')}} 
                                placeholder = {'Mass in grams'}
                                keyboardType ={'numeric'}
                            />
                        </View>

                        <View>
                            <Button style = {styles.itemEditButton} onPress = { () => { this.saveEdit('list') }}>
                                Save
                            </Button>
                        </View>
                    </View>
                </Modal>
            }
            else {
                mainSection = 
                <View style = {styles.inputContainer}>
                    <DefaultInput style = {styles.input} onChangeText = {(text) => { this.onEditField(text, 'name')}} placeholder = {'Item'} />
                    <DefaultInput 
                        style = {styles.input} 
                        onChangeText = {(text) => { this.onEditField(text, 'calories')}} 
                        placeholder = {'Calories'}
                        keyboardType ={'numeric'}/> 
                </View>
            }

        }
        return (
            <View style = {styles.container}>
                <View style = {styles.marginContainer}>
                    <MainText>
                        {this.props.itemIndex + 1}
                    </MainText>
                    {mainSection}
                    <View style = {(this.state.mode === 'default') ? styles.buttonContainer : styles.reverseButtonContainer}>
                        <Button style = {styles.button} onPress = { () => { this.toggleMode(); this.setEditMode('default'); }}>{(this.state.mode === 'default') ? 'Edit' : 'Cancel edit'}</Button>
                        {(this.state.mode === 'default') ?
                            <Button 
                                style = {styles.removeButton}
                                textColor = {'white'} 
                                onPress = { () => { this.props.removeItem(this.props.itemIndex)}}>Remove item</Button>
                            :
                            <Button style = {styles.button} onPress = { () => { this.saveEdit('custom'); }}>Save</Button>
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
    itemEditButton: {
        backgroundColor: '#22FF22'
    },
    removeButton: {
        backgroundColor: 'red'
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