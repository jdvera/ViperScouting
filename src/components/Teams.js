import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
// import ActionButton from "./ActionButton.js";
// import AnimatedBar from "./AnimatedBar.js";

class Teams extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Teams Page</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});


const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(Teams);