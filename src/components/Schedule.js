import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';

class Schedule extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Schedule Page</Text>
                <Text>Match 1 | Vandergrift </Text>
                <Button title="Start Scouting" onPress={() => this.props.handleChangePage("prematch")} />
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

export default connect(mapStoreToProps)(Schedule);