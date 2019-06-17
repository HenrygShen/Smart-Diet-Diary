import React from 'react';
import { connect } from 'react-redux';

import { 
    View
} from 'react-native';

import startMainTabs from '../mainTabs/startMainTabs';



class StartScreen extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        startMainTabs();
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

export default connect(null, null)(StartScreen);