import React from 'react';
import { View, StyleSheet, Modal, ScrollView } from 'react-native';

import MainText from '../../../components/UI/MainText/MainText';
import Button from '../../../components/UI/Button/Button';
import HeadingText from '../../../components/UI/HeadingText/HeadingText';
import DefaultInput from '../../../components/UI/DefaultInput/DefaultInput';
import RadioForm from 'react-native-simple-radio-button';

class EditableEntry extends React.Component {

    constructor(props) {
        super(props);
        let list = [];
        let massDisabled = false;
        let index = 0;
        for (let i = 0; i < props.list.length; i++) {
            if (props.list[i].name === this.props.name) {
                index = i;
                massDisabled = (props.list[i].shape === 'Fixed');  
            }
            list.push({
                label: props.list[i].name,
                shape: props.list[i].shape,
                value: i
            })
        }
        this.state = {
            mode: 'default',
            editMode: 'default',
            index: index,
            details: {
                mass: this.props.mass,
                name: this.props.name,
                calories: this.props.calories
            },
            type: this.props.type,
            controls: {
                name: null,
                mass: NaN,
                calories: NaN
            },
            list: list,
            massDisabled: massDisabled
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
        if (key === 'mass' || key === 'calories') {
            text = parseInt(text);
        }

        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    [key]: text
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
    }

    onRadioInputChange = (value) => {
        this.setState(prevState => {
            let massDisabled = false;
            if (this.state.list[value].shape === 'Fixed') {
                massDisabled = true;
            }
            return {
                ...prevState,
                details: this.state.list[value].label,
                controls: {
                    ...prevState.controls,
                    name: this.state.list[value].label
                },
                massDisabled: massDisabled
            }
        })
    }


    render() {
        let mainSection;
        let label;
        if (this.state.type === 'list') {
            if (this.state.massDisabled) {
                label = <MainText>Fixed</MainText>;
            }
            else {
                label = <MainText>Mass: {`${parseInt(this.state.details.mass).toFixed(0)}g`}</MainText>;
            }
        }
        else {
            label = <MainText>Calories: {`${parseInt(this.state.details.calories).toFixed(0)}kCal`}</MainText>;
        }
        if (this.state.mode === 'default') {
            mainSection =
            <View style = {styles.inputContainer}>
                <View style = {styles.subContainer}>
                    <MainText>Item: {this.state.details.name}</MainText>
                </View>
                <View style = {styles.subContainer}>
                    {label}
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
                            <Button onPress = { () => { this.setEditMode('list')}}>Choose from list</Button>
                        </View>
                        <View style = {styles.button}>
                            <Button onPress = { () => { this.setEditMode('custom')}}>Add your own item</Button>
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
                            buttonColor={'#ADD8E6'}
                            selectedButtonColor = {'#ADD8E6'}
                            initial={this.state.index}
                            onPress={(value) => { this.onRadioInputChange(value)}}
                            />
                        </ScrollView>
                        {!this.state.massDisabled ?
                        <View>
                            <DefaultInput 
                                style = {styles.input} 
                                onChangeText = {(text) => { this.onEditField(text, 'mass')}} 
                                placeholder = {'Mass in grams'}
                                keyboardType ={'numeric'}
                            />
                        </View>
                        :
                        <MainText>
                            Fixed size
                        </MainText>
                        }
  

                        <View>
                            <Button onPress = { () => { this.saveEdit('list') }} disabled = {Number.isNaN(this.state.controls.mass) && !this.state.massDisabled}>Save</Button>
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
                        <View style = {styles.buttonWrapper}><Button onPress = { () => { this.toggleMode(); this.setEditMode('default'); }}>Edit</Button></View>
                        :
                        <View style = {styles.buttonWrapper}><Button onPress = { () => { this.toggleMode(); this.setEditMode('default'); }}>Cancel edit</Button></View>
                        }
                        {(this.state.mode === 'default') ?
                            <View style = {styles.buttonWrapper}><Button onPress = { () => { this.props.removeItem(this.props.itemIndex)}}>Remove item</Button></View>
                            :
                            <View style = {styles.buttonWrapper}><Button onPress = { () => { this.saveEdit('custom') }}>Save</Button></View>
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
        borderWidth: 1
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
    },
    buttonWrapper: {
        width: '38%'
    }
})