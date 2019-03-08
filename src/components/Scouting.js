import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import ActionButton from "./ActionButton.js";
import AnimatedBar from "./AnimatedBar.js";
// import moment from "moment";

const gameDuration = 15000;

class Scouting extends React.Component {
    state = {
        // start match & timer stuff
        intervalId: null,
        startTime: null,
        time: 0,
        prog: 0,

        // robot game state
        carrying: null,
        lastAction: null,
        undoing: false,

        // redux stuff
        events: [],
        savedToRedux: false
    };

    componentDidMount() {
        this.startTimer();
    };

    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
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

        if (carrying) {
            let index = undoing ? 2 : 1;
            stateObj.events[events.length - index].type = action;
        }
        else {
            const time = Date.now() - startTime;
            const event = {
                type: action,
                time
            };
            stateObj.events.push(event);
        }
        this.setState(stateObj);
    };

    handleTask = action => {
        const { events, carrying, startTime, undoing } = this.state;
        let stateObj;

        if (action === "undo") {
            stateObj = {
                carrying: events[events.length - 1].type[0] + "_",
                lastAction: null,
                undoing: true
            };
        }
        else if (undoing) {
            events[events.length - 1].type = carrying + action;
            stateObj = {
                carrying: null,
                lastAction: action,
                undoing: false,
                events
            };
        }
        else if (carrying) {
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
    };

    startTimer = () => {
        if (!this.state.intervalId) {
            const intervalId = setInterval(() => {
                let { startTime } = this.state;
                time = Date.now() - startTime;
                const stateObj = { time };
                if (time > gameDuration) {
                    clearInterval(intervalId);
                    stateObj.intervalId = null;
                    stateObj.time = gameDuration;
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

    handleChangePage = () => {
        const timeline = this.state.events.map(
            (event) => {return { eventType: event.type.toUpperCase(), time: event.time };}
        );
        this.props.savePreMatch(timeline);
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
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionsContainer}>
                    <View style={styles.buttonWrapper}>
                        <ActionButton action="h_" type="pickup" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>PickUp Hatch</Text>
                        </ActionButton>
                        <ActionButton action="c_" type="pickup" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>PickUp Cargo</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r1" type="task" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Rocket 1</Text>
                        </ActionButton>
                        <ActionButton action="dp" type="task" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Drop</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r2" type="task" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Rocket 2</Text>
                        </ActionButton>
                        <ActionButton action="cs" type="task" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
                            <Text>Cargo Ship</Text>
                        </ActionButton>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <ActionButton action="r3" type="task" page="scouting" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
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
                    duration={gameDuration}
                >
                    <View style={[styles.row, styles.center]}>
                        {this.state.time !== gameDuration ?
                            <Text style={[styles.barText, { fontSize: 30 }]}>
                                {this.displayTime()}
                            </Text> :
                            <Button title="Submit" onPress={this.handleChangePage} />
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
    return {  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        savePreMatch: (timeline) => Promise.resolve(
            dispatch(reduxActions.setTimeline({timeline}))
        ).then(() => {
            ownProps.updateMainState({ showPage: "postmatch" })
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Scouting);