import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import ActionButton from "./ActionButton.js";

class PreGame extends React.Component {
    state = {
        startHolding: "",
        startHAB: "",
        startConfig: ""
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleButtonPress = (type, action) => {
        this.setState({ [type]: action },
            () => console.log(this.state)
        );
    };

    startGame = () => {
        this.props.updateMainState({ ...this.state }, "scouting");
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionsContainer}>
                    <View style={styles.buttonWrapper}>
                        <ActionButton action="lvl_1" type="startHAB" value={this.state.startHAB} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>HAB Level 1</Text>
                        </ActionButton>
                        <ActionButton action="lvl_2" type="startHAB" value={this.state.startHAB} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>HAB Level 2</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="cs_c" type="startConfig" value={this.state.startConfig} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>Cargo Ship</Text>
                            <Text>Two Cargo</Text>
                        </ActionButton>
                        <ActionButton action="car" type="startHolding" value={this.state.startHolding} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>Robot Holding</Text>
                            <Text>Cargo</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="cs_1-1" type="startConfig" value={this.state.startConfig} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>Cargo Ship</Text>
                            <Text>One Cargo | One Hatch</Text>
                        </ActionButton>
                        <ActionButton action="hat" type="startHolding" value={this.state.startHolding} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>Robot Holding</Text>
                            <Text>Hatch</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="cs_h" type="startConfig" value={this.state.startConfig} page="prematch" handleButtonPress={this.handleButtonPress}>
                            <Text>Cargo Ship</Text>
                            <Text>Two Hatches</Text>
                        </ActionButton>
                        <View style={styles.status} />
                    </View>
                </View>
                {/* <TouchableOpacity style={styles.startButton} onPress={this.startGame}>
                    <Text>Start Game</Text>
                </TouchableOpacity> */}
                <Button title="Start Game" onPress={this.startGame} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    // Views
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: "stretch"
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