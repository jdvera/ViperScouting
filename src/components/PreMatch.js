import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import ActionButton from "./ActionButton.js";

class PreGame extends React.Component {
    state = {
        piece: null,
        pos: null,
        config: null
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleButtonPress = (type, action) => {
        this.setState({ [type]: action });
    };

    canSubmit = () => {
        return this.state.piece !== null &&
            this.state.pos !== null &&
            this.state.config !== null
    };

    startGame = () => {
        this.props.savePreMatch(this.state);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionsContainer}>
                    <View style={styles.buttonWrapper}>
                        <ActionButton
                            action={0}
                            type="piece"
                            value={this.state.piece}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>Robot Holding</Text>
                            <Text>Hatch</Text>
                        </ActionButton>
                        <ActionButton
                            action={1}
                            type="piece"
                            value={this.state.piece}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>Robot Holding</Text>
                            <Text>Cargo</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonWrapper}>
                        <ActionButton
                            action={0}
                            type="config"
                            value={this.state.config}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>Cargo Ship</Text>
                            <Text>Two Cargo</Text>
                        </ActionButton>
                        <ActionButton
                            action={0}
                            type="pos"
                            value={this.state.pos}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>HAB Level 1</Text>
                        </ActionButton>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <ActionButton
                            action={1}
                            type="config"
                            value={this.state.config}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>Cargo Ship</Text>
                            <Text>One Cargo | One Hatch</Text>
                        </ActionButton>
                        <ActionButton
                            action={1}
                            type="pos"
                            value={this.state.pos}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>HAB Level 2</Text>
                        </ActionButton>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <ActionButton
                            action={2}
                            type="config"
                            value={this.state.config}
                            page="prematch"
                            handleButtonPress={this.handleButtonPress}
                        >
                            <Text>Cargo Ship</Text>
                            <Text>Two Hatches</Text>
                        </ActionButton>
                        <View style={styles.status} />
                    </View>
                </View>
                <Button title="Start Game" onPress={this.startGame} disabled={!this.canSubmit()}/>
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
        // alignItems: "stretch"
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

const mapStateToProps = state => {
    return { };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        savePreMatch: (pregame) => Promise.resolve(
                dispatch(reduxActions.setPreGame(pregame))
            ).then(() => {
                ownProps.updateMainState({ showPage: "scouting" })
            })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PreGame);