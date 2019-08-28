import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../components/UI/MainText/MainText';

class EstimatorNavBar extends React.Component {

    constructor(props) {
        super(props);
    }

    toggleDrawer = () => {
        this.props.toggleDrawer();
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.menu}>
                    <TouchableOpacity onPress = {this.toggleDrawer}>
                        <Icon name = {'md-menu'} size = {30} />
                    </TouchableOpacity>
                </View>
                <View style = {styles.subContainer}>
                    <MainText style = {{fontSize: 20}} color = {'black'}>Calculate calories</MainText>
                </View>
            </View>
        )
    }
}


export default EstimatorNavBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    menu: {
        paddingLeft: 20,
        paddingRight: 20
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})