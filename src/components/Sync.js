import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import * as reduxActions from "../redux/actions";

class Sync extends React.Component {
    state = {
        eventCodeInput: this.props.eventCode,
        syncingFirebase: false,
        syncingTBA: false
    };

    onInputChange = (value) => this.setState({ eventCodeInput: value });
    saveEventCode = () => {
        console.log(`Saving event code ${this.state.eventCodeInput}`);
        this.props.setEventCode(this.state.eventCodeInput);
    };
    getEventInfo = () => {
        console.log(`Grabbing event data for ${this.state.eventCodeInput}`);
        this.setState({syncingTBA: true});
        this.props.updateMatches().then(() => {
            this.props.updateMainState({ showPage: "schedule" });
        });
    };
    syncWithFirebase = () => {
        console.log(`Syncing to firebase`);
        this.setState({syncingFirebase: true});
        this.props.syncToFirebase().then(() => {
            this.props.updateMainState({ showPage: "teams" });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Sync Page</Text>
                <View style={styles.actionsContainer}>
                    <View style={styles.actionsContainer}>
                        <Text>Event code: </Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.onInputChange}
                        value={this.state.eventCodeInput}
                    />
                    <View style={{ paddingRight: 10 }}>
                        <Button title="Save" onPress={this.saveEventCode}/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <Button
                            title="Sync with TBA"
                            onPress={this.getEventInfo}
                            loading={this.state.syncingTBA}
                        />
                    </View>
                </View>
                <View style={styles.actionsContainer}>
                    <View style={{ paddingRight: 10 }}>
                        <Button
                            title="Sync with Firebase"
                            onPress={this.syncWithFirebase}
                            loading={this.state.syncingFirebase}
                            containerStyle={styles.containerStyle}
                            buttonStyle={styles.buttonStyle}
                        />
                    </View>
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
        // flex: 1,
        flexDirection: "row",
        // height: 100
    },
    textInput: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 20
    },
    containerStyle: {
        height: 80,
    },
    buttonStyle: {
        height: 50,
    },
    largerText: {
        fontSize: 34
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
        updateMatches: () => dispatch(reduxActions.updateMatches()),
        syncToFirebase: () => dispatch(reduxActions.syncToFirebase()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sync);
