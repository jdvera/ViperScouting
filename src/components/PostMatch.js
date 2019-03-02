import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import ActionButton from "./ActionButton.js";
import AnimatedBar from "./AnimatedBar.js";
// import moment from "moment";

class PostGame extends React.Component {
    state = {
        // robot info
        robotBreak: null,
        endLevel: null,
        host: null,
        liftablitity: null,
        defense: null,
        role: {
            cargoShipper: false,
            rocketeer: false,
            climber: false
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleRoleChange = (name) => {
        const { role } = this.state;
        role[name] = !role[name];
        this.setState({ role });
    };

    submitGameData = () => {

        this.props.updateMainState({ ...this.state }, "prematch");
    };

    restartGame = () => {
        this.props.handleChangePage("scouting");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Post Match Screen</Text>
                <View style={styles.postScreenMainColumn}>
                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Broken?</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Lost Connection" onPress={() => this.handleInputChange("robotBreak", 0)} color={this.state.robotBreak === 0 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Really Broken" onPress={() => this.handleInputChange("robotBreak", 1)} color={this.state.robotBreak === 1 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Kinda Broken" onPress={() => this.handleInputChange("robotBreak", 2)} color={this.state.robotBreak === 2 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Healthy" onPress={() => this.handleInputChange("robotBreak", 3)} color={this.state.robotBreak === 3 ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Did They Host?</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="x0" onPress={() => this.handleInputChange("host", 0)} color={this.state.host === 0 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="x1" onPress={() => this.handleInputChange("host", 1)} color={this.state.host === 1 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="x2" onPress={() => this.handleInputChange("host", 2)} color={this.state.host === 2 ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Liftability</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Bad" onPress={() => this.handleInputChange("liftability", 0)} color={this.state.liftability === 0 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Meh" onPress={() => this.handleInputChange("liftability", 1)} color={this.state.liftability === 1 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Good" onPress={() => this.handleInputChange("liftability", 2)} color={this.state.liftability === 2 ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Defense</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Bad" onPress={() => this.handleInputChange("defense", 0)} color={this.state.defense === 0 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Meh" onPress={() => this.handleInputChange("defense", 1)} color={this.state.defense === 1 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Good" onPress={() => this.handleInputChange("defense", 2)} color={this.state.defense === 2 ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Final Position:</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="No HAB" onPress={() => this.handleInputChange("endLevel", 0)} color={this.state.endLevel === 0 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="HAB Level 1" onPress={() => this.handleInputChange("endLevel", 1)} color={this.state.endLevel === 1 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="HAB Level 2" onPress={() => this.handleInputChange("endLevel", 2)} color={this.state.endLevel === 2 ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="HAB Level 3" onPress={() => this.handleInputChange("endLevel", 3)} color={this.state.endLevel === 3 ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.postScreenQuestionRow}>
                        <View style={styles.postScreenColumn}>
                            <View style={styles.postScreenRow}>
                                <Text>Fulfilled Bot Role: (Select all that apply)</Text>
                            </View>
                            <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Cargo Shipper" onPress={() => this.handleRoleChange("cargoShipper")} color={this.state.role.cargoShipper ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Rocketeer" onPress={() => this.handleRoleChange("rocketeer")} color={this.state.role.rocketeer ? "deepskyblue" : "gray"} />
                                </View>
                                <View style={{ paddingRight: 10 }}>
                                    <Button title="Climber" onPress={() => this.handleRoleChange("climber")} color={this.state.role.climber ? "deepskyblue" : "gray"} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <Button title="submit game data" onPress={this.submitGameData} />
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
    postScreenMainColumn: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    postScreenQuestionRow: {
        flexDirection: "row"
    },
    postScreenColumn: {
        flexDirection: "column"
    },
    postScreenRow: {
        flexDirection: "row"
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

export default connect(mapStoreToProps)(PostGame);