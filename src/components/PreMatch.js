import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import ActionButton from "./ActionButton.js";
import AnimatedBar from "./AnimatedBar.js";
// import moment from "moment";

class PreGame extends React.Component {
    state = {
        schoolName: ""
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    startGame = () => {
        this.props.handleChangePage("scouting");
        // const { events } = this.state;
        // this.props.dispatch(reduxActions.loadGameData({
        //     schoolName: { events }
        // }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Start Match</Text>
                <View style={{ ...styles.row }}>
                    <View style={{ flex: 1 }}>{/* intentionally left blank */}</View>
                    <Text style={{ flex: 1 }}>School Name</Text>
                    <TextInput value={this.state.schoolName} placeholder="Vandergrift" onChangeText={value => this.handleInputChange("schoolName", value)} autoCorrect={false} style={styles.inputStyle} />
                    <View style={{ flex: 1 }}>{/* intentionally left blank */}</View>
                </View>
                <TouchableOpacity style={styles.startButton} onPress={this.startGame}>
                    <Text>Start Game</Text>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    // Views
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    actionsContainer: {
        flex: 1,
        flexDirection: "row"
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    divider: {
        backgroundColor: "gray",
        width: StyleSheet.hairlineWidth
    },
    actions: {
        flex: 3,
        flexDirection: "column"
    },
    status: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    postScreenColumn: {
        flex: 1,
        flexDirection: "column"
    },
    postScreenRow: {
        flexDirection: "row",
        justifyContent: "space-around"
    },

    // Buttons
    startButton: {
        backgroundColor: "aqua",
        height: 100,
        width: 175,
        alignItems: "center",
        justifyContent: "center"
    },
    actionButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },

    // Input Field
    inputStyle: {
        flex: 2,
        borderColor: "grey",
        borderWidth: StyleSheet.hairlineWidth
    },

    // Progress Bar
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column"
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    barText: {
        backgroundColor: "transparent",
        color: "#FFF",
    }
});

const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(PreGame);