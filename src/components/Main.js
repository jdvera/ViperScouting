import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import ActionButton from "./ActionButton.js";
import AnimatedBar from "./AnimatedBar.js";
// import moment from "moment";

class Main extends React.Component {
    state = {
        // determine what "page" to display
        showHome: true,
        postMatch: false,

        // start match & timer stuff
        intervalId: null,
        startTime: null,
        time: 0,
        prog: 0,

        // robot state
        carrying: null,
        lastAction: null,
        undoing: false,

        // redux stuff
        events: [],
        savedToRedux: false
    };

    handleButtonPress = (type, action) => {
        if (this.state.intervalId) {
            if (type === "pickup" && action !== this.state.carrying) {
                this.handlePickup(action);
            }
            else if (type === "task") {
                this.handleTask(action);
            }
        }
    };

    handlePickup = action => {
        const { events, carrying, startTime, undoing } = this.state;
        const stateObj = {
            carrying: action,
            lastAction: action,
            events
        };

        console.log("----------------");
        if (carrying) {
            console.log("- PICKUP - switched carried obj to " + action);
            index = undoing ? 2 : 1;
            stateObj.events[events.length - index].type = action;
        }
        else {
            console.log("- PICKUP - new carried obj: " + action);
            const time = Date.now() - startTime;
            const event = {
                type: action,
                time
            };
            stateObj.events.push(event);
        }
        this.setState(stateObj);

        console.log(stateObj);
        console.log("----------------");
    };

    handleTask = action => {
        const { events, carrying, startTime, undoing } = this.state;
        let stateObj;

        console.log("----------------");
        if (action === "undo") {
            console.log("- TASK - starting undo");
            stateObj = {
                carrying: events[events.length - 1].type[0] + "_",
                lastAction: null,
                undoing: true
            };
        }
        else if (undoing) {
            console.log("- TASK - completing undo");
            events[events.length - 1].type = carrying + action;
            stateObj = {
                carrying: null,
                lastAction: action,
                undoing: false,
                events
            };
        }
        else if (carrying) {
            console.log("- TASK - new task competed: " + carrying + action);
            const time = Date.now() - startTime;
            const event = {
                type: carrying + action,
                time
            };
            events.push(event);
            stateObj = {
                carrying: null,
                lastAction: action,
                events
            };
        }
        this.setState(stateObj);

        console.log(stateObj);
        console.log("----------------");
    };

    submitGameData = () => {
        const { events } = this.state;
        this.props.dispatch(reduxActions.loadGameData({
            schoolName: { events }
        }));
        this.setState({ savedToRedux: true }, () => {
            console.log(this.props.gameState);
        })
    }

    restartGame = () => {
        this.setState({
            showHome: true,
            postMatch: false,
            intervalId: null,
            startTime: null,
            time: 0,
            prog: 0,
            carrying: null,
            lastAction: null,
            undoing: false,
            events: [],
            savedToRedux: false
        }, this.startTimer);
    }

    startTimer = () => {
        if (!this.state.intervalId) {
            const intervalId = setInterval(() => {
                let { startTime } = this.state;
                time = Date.now() - startTime;
                const stateObj = { time };
                if (time > 59999) {
                    clearInterval(intervalId);
                    stateObj.intervalId = null;
                    stateObj.time = 60000;
                }
                this.setState(stateObj);
            }, 200);

            this.setState({
                intervalId,
                showHome: false,
                startTime: Date.now()
            }, () => this.setState({ prog: 1 }));
        }
    };

    stopTimer = () => {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.setState({
                showHome: true,
                intervalId: null,
                time: 0
            });
        }
    };

    displayTime = () => {
        let { time } = this.state;
        let minutes = Math.floor(time / 60000);
        time = time - (minutes * 60000);
        let seconds = Math.floor(time / 1000);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        let mili = (time - (seconds * 1000) + "").padStart(3, "0");
        return minutes + ":" + seconds + "." + mili;
    };

    displayGameState = () => {
        let { carrying, events, undoing } = this.state;

        if (carrying === "h_") carrying = "Hatch";
        else if (carrying === "c_") carrying = "Cargo";
        else carrying = "Nothing";


        let lastTask;
        let lastCarried;
        let lastVerb;
        if (events.length) {
            lastCarried = events[events.length - 1].type[0] === "h" ? "hatch" : "cargo";
            lastVerb = events[events.length - 1].type[0] === "h" ? " on" : " in";
            if (events.length > 1) {
                lastTask = events[events.length - 1].type.slice(2);
            }
        }

        let lastEventText = "";
        if (lastTask === "dp") {
            lastEventText = "Robot dropped " + lastCarried;
        }
        else if (lastTask) {
            if (lastTask[0] === "r") {
                lastEventText = "Robot put the " + lastCarried + lastVerb + " lvl " + lastTask[1] + " of the Rocket";
            }
            else {
                lastEventText = "Robot put the " + lastCarried + lastVerb + " the Cargo Ship";
            }
        }
        else if (lastCarried === "hatch") {
            lastEventText = "Robot picked up a hatch";
        }
        else if (lastCarried === "cargo") {
            lastEventText = "Robot picked up some cargo";
        }

        return (undoing ?
            <View style={styles.status}>
                <Text style={{ textAlign: "center" }}>UNDOING</Text>
            </View>
            :
            <View style={styles.status}>
                <Text style={{ textAlign: "center" }}>CURRENTLY</Text>
                <Text style={{ marginVertical: 5 }}>Carrying: {carrying}</Text>
                <Text>{lastEventText && "Last Event: " + lastEventText}</Text>
            </View>
        )
    }

    render() {
        if (this.state.showHome) {
            return (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <Text>Start Match</Text>
                    <TouchableOpacity style={styles.startButton} onPress={this.startTimer}>
                        <Text>Start Game</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if (this.state.postMatch) {
            return (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <Text>Post Match Screen</Text>
                    <Button title="restart" onPress={this.restartGame} />
                    <Button title="submit game data" onPress={this.submitGameData} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.actionsContainer}>
                    <View style={styles.buttonWrapper}>
                        <ActionButton action="h_" type="pickup" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>PickUp Hatch</Text>
                        </ActionButton>
                        <ActionButton action="c_" type="pickup" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>PickUp Cargo</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider}>
                        {/* intentionally left blank */}
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r1" type="task" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Rocket 1</Text>
                        </ActionButton>
                        <ActionButton action="dp" type="task" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Drop</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider}>
                        {/* intentionally left blank */}
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r2" type="task" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Rocket 2</Text>
                        </ActionButton>
                        <ActionButton action="cs" type="task" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Cargo Ship</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider}>
                        {/* intentionally left blank */}
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r3" type="task" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Rocket 3</Text>
                        </ActionButton>
                        {this.displayGameState()}
                    </View>
                </View>

                <AnimatedBar
                    progress={this.state.prog}
                    height={null}
                    borderColor="#DDD"
                    barColor="tomato"
                    borderRadius={5}
                    borderWidth={5}
                    duration={60000}
                >
                    <View style={[styles.row, styles.center]}>
                        {this.state.time !== 60000 ?
                            <Text style={[styles.barText, { fontSize: 30 }]}>
                                {this.displayTime()}
                            </Text> :
                            <Button title="Submit" onPress={() => this.setState({ postMatch: true })} />
                        }
                    </View>
                </AnimatedBar>
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


    row: {
        flexDirection: "row",
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

export default connect(mapStoreToProps)(Main);