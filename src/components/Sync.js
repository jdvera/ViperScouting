import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import * as reduxActions from "../redux/actions";

class Sync extends React.Component {
    state = {
        eventCodeInput: this.props.eventCode
    };

    onInputChange = (value) => this.setState({ eventCodeInput: value });
    saveEventCode = () => {
        console.log(`Saving event code ${this.state.eventCodeInput}`);
        this.props.setEventCode(this.state.eventCodeInput);
    };
    getEventInfo = () => {
        console.log(`Grabbing event data for ${this.state.eventCodeInput}`);
        this.props.updateMatches().then(() => {
            this.props.updateMainState({ showPage: "schedule" });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Sync Page</Text>
                <View style={styles.actionsContainer}>
                    <Text>Event code: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.onInputChange}
                        value={this.state.eventCodeInput}
                    />
                    <Button title="Save" onPress={this.saveEventCode}/>
                    <Button title="Sync with TBA" onPress={this.getEventInfo}/>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    actionsContainer: {
        flex: 1,
        flexDirection: "row",
        height: 100
    },
    textInput: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1
    }
});

const mapStateToProps = state => {
    return {
        eventCode: state.schedule.eventCode,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setEventCode: (eventCode) => dispatch(reduxActions.setEventCode(eventCode)),
        updateMatches: () => dispatch(reduxActions.updateMatches())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sync);
