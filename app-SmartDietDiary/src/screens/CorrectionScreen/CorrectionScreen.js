import React from 'react';
import { View, StyleSheet, } from 'react-native';

import { connect } from 'react-redux';

import { insertData } from '../../utility/database';

import Button from '../../components/UI/Button/Button';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class CorrectionScreen extends React.Component {

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
                        name: this.props.imageState.result['name'],
                        calories: this.props.imageState.result['calories']
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

    
    render() {
        return (
            <View style = {styles.container}>
                <Button>Hi</Button>
                
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CorrectionScreen);


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})