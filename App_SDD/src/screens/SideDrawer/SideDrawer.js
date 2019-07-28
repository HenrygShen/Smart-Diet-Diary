import React from 'react';
import { connect } from 'react-redux';

import { View, Dimensions, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainText from '../../components/UI/MainText/MainText';

import { RESET_APP_STATE } from '../../store/constants';
import { resetDB } from '../../utility/database';

const mapDispatchToProps = (dispatch) => {
    return {
        resetAppState: () => dispatch({ type: RESET_APP_STATE })
    }
}

class SideDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
        }
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change',this.updateStyles);
    }

    onViewProfile = () => {
        this.props.navigation.navigate('ProfileScreen');
    }

    onSignOut = () => {
        Alert.alert(
            '',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { text: 'Yes', onPress: () => {
                    resetDB()
                    .then(() => {
                        this.props.navigation.navigate('StartUp');
                        this.props.resetAppState();
                    })
                }},
                {cancelable: false}
            ]
        )

    }

    render() {
        const { viewMode } = this.state;
        return (
            <View style = {[{ width: (viewMode === 'portrait') ? Dimensions.get('window').width * 0.8 : Dimensions.get('window').width * 0.41}, styles.container]}>
                <TouchableOpacity onPress = {this.onViewProfile}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-person' : 'ios-person'} size = {30} color = '#bbb' />
                        <MainText>My Profile</MainText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.onSignOut}>
                    <View style = {styles.drawerItem}>
                        <Icon style = {styles.drawerItemIcon} name = { Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'} size = {30} color = '#bbb' />
                        <MainText>Sign out</MainText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);


const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        flex: 1
    },
    profileIconContainer: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    nameContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    drawerItemIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    imageContainer: {
        width: 50,
        height: 50
    }
})