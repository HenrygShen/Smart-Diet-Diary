import React from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';
import { Button, Text } from 'native-base';

import MainText from '../../../components/UI/MainText/MainText';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
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
            mode: 'default',
            editMode: 'default',
            details: {
                mass: this.props.mass,
                name: this.props.name,
                calories: this.props.calories
            },
            type: this.props.type,
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
                ...prevState,
                details: {
                    ...prevState.controls
                },
                mode: 'default',
                editMode: 'default',
                type: type,
                controls: {
                    ...prevState.controls
                }
            }
        });
        console.log(this.state);
    }

    onRadioInputChange = (value) => {
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    name: this.state.list[value].label
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
                    <MainText>Item: {this.state.details.name}</MainText>
                </View>
                <View style = {styles.subContainer}>
                    {(this.state.type === 'list') ? 
                    <MainText>Mass: {`${this.state.details.mass}g`}</MainText>
                    :
                    <MainText>Calories: {`${this.state.details.calories}kCal`}</MainText>
                    }
                    
                </View>
                
            </View>
        }
        /* In edit mode */
        else {
            if (this.state.editMode === 'default') {
                mainSection =
                <View style = {styles.inputContainer}>
                    <View style = {{flex:1, flexDirection: 'column', alignItems: 'center', margin: 20}}>
                        <View style = {styles.button}>
                            <Button onPress = { () => { this.setEditMode('list')}} primary><Text>Choose from list</Text></Button>
                        </View>
                        <View style = {styles.button}>
                            <Button onPress = { () => { this.setEditMode('custom')}} primary><Text>Add your own item</Text></Button>
                        </View>
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
                            <Button onPress = { () => { this.saveEdit('list') }} success><Text>Save</Text></Button>
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
                        {(this.state.mode === 'default') ?
                        <Button onPress = { () => { this.toggleMode(); this.setEditMode('default'); }} warning><Text>Edit</Text></Button>
                        :
                        <Button onPress = { () => { this.toggleMode(); this.setEditMode('default'); }} danger><Text>Cancel edit</Text></Button>
                        }
                        {(this.state.mode === 'default') ?
                            <Button onPress = { () => { this.props.removeItem(this.props.itemIndex)}} danger><Text>Remove item</Text></Button>
                            :
                            <Button onPress = { () => { this.saveEdit('custom') }} success><Text>Save</Text></Button>
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
    button: {
        marginTop: 10
    },  
    reverseButtonContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    },
    buttonContainer: {
        marginTop: 10,
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