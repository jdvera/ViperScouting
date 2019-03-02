import React from 'react';
import { connect } from 'react-redux';
import * as reduxActions from "./redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
import Schedule from "./components/Schedule.js";
import PreMatch from "./components/PreMatch.js";
import Scouting from "./components/Scouting.js";
import PostMatch from "./components/PostMatch.js";
import Teams from "./components/Teams.js";
import Sync from "./components/Sync.js";
import NavButton from "./components/NavButton.js";


class Main extends React.Component {
    state = {
        showPage: "schedule",

        //Schedule
        teamArr: [
            [6800, "0001", 2300, 3400, 5600, 6700],
            [6800, "0002", 2300, 3400, 5600, 6700],
            [6800, "0003", 2300, 3400, 5600, 6700],
            [6800, "0004", 2300, 3400, 5600, 6700],
            [6800, "0005", 2300, 3400, 5600, 6700],
            [6800, "0006", 2300, 3400, 5600, 6700],
            [6800, "0007", 2300, 3400, 5600, 6700],
            [6800, "0008", 2300, 3400, 5600, 6700],
            [6800, "0009", 2300, 3400, 5600, 6700],
            [6800, "0010", 2300, 3400, 5600, 6700],
            [6800, "0011", 2300, 3400, 5600, 6700],
            [6800, "0012", 2300, 3400, 5600, 6700],
            [6800, "0013", 2300, 3400, 5600, 6700],
            [6800, "0014", 2300, 3400, 5600, 6700],
            [6800, "0015", 2300, 3400, 5600, 6700],
            [6800, "0016", 2300, 3400, 5600, 6700],
            [6800, "0017", 2300, 3400, 5600, 6700],
            [6800, "0018", 2300, 3400, 5600, 6700],
            [6800, "0019", 2300, 3400, 5600, 6700],
            [6800, "0020", 2300, 3400, 5600, 6700],
            [6800, "0021", 2300, 3400, 5600, 6700],
            [6800, "0022", 2300, 3400, 5600, 6700],
            [6800, "0023", 2300, 3400, 5600, 6700],
            [6800, "0024", 2300, 3400, 5600, 6700],
            [6800, "0025", 2300, 3400, 5600, 6700],
            [6800, "0026", 2300, 3400, 5600, 6700],
            [6800, "0027", 2300, 3400, 5600, 6700],
            [6800, "0028", 2300, 3400, 5600, 6700]
        ],
        i: 0,
        j: 0,

        // PreMatch
        preMatch: {
            piece: "",
            pos: "",
            config: ""
        },

        // Scouting
        timeline: [],

        // PostMatch
        postMatch: {
            robotBreak: null,
            pos: null,
            host: null,
            liftability: null,
            defense: null
        }
    };

    currTeamNum = () => {
        let { showPage, teamArr, i, j } = this.state;
        return teamArr[i][j];
    };

    updateMainState = (stateObj) => {
        this.setState(stateObj/*,
            () => console.log(stateObj)*/
        );
    };

    saveMatch = () => {
        let { preMatch, timeline, postMatch, i } = this.state;
        let rawResult = { preMatch, timeline, postMatch, matchNum: i + 1, teamNum: this.currTeamNum() };
        console.log("****RAWRESULTS***");
        console.log(rawResult);
        console.log('going into Redux');
        this.props.saveMatch(rawResult);
    };

    showTeamInfo = () => {
        let { showPage, teamArr, i, j } = this.state;
        if (showPage === "prematch" || showPage === "scouting" || showPage === "postmatch") {
            return <Text>Match: {i + 1} | Team: {this.currTeamNum()}</Text>
        }
    };

    pageToDisplay = () => {
        let { i, j, teamArr } = this.state;
        switch (this.state.showPage) {
            case "schedule":
                return <Schedule updateMainState={this.updateMainState} teamArr={teamArr} i={i} j={j} />;
            case "prematch":
                return <PreMatch updateMainState={this.updateMainState} />;
            case "scouting":
                return <Scouting updateMainState={this.updateMainState} />;
            case "postmatch":
                return <PostMatch updateMainState={this.updateMainState} currentMatch={this.state.match} i={i} saveMatch={this.saveMatch}/>;
            case "teams":
                return <Teams updateMainState={this.updateMainState} teamArr={teamArr} i={i} j={j} />;
            case "sync":
                return <Sync updateMainState={this.updateMainState} />;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.navMain}>
                    <Text>Viper Scouting</Text>
                    {this.showTeamInfo()}
                    <View style={styles.row}>

                        <NavButton showPage={this.state.showPage} name="schedule" updateMainState={this.updateMainState}>
                            Schedule
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="prematch" updateMainState={this.updateMainState}>
                            Pre-Match
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="scouting" updateMainState={this.updateMainState}>
                            Scouting
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="postmatch" updateMainState={this.updateMainState}>
                            Post Match
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="teams" updateMainState={this.updateMainState}>
                            Teams
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="sync" updateMainState={this.updateMainState}>
                            Sync
                        </NavButton>

                    </View>
                </View>
                {this.pageToDisplay()}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    // Views
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    row: {
        flexDirection: "row"
    },

    // Nav
    navMain: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: "lightgray",
        maxHeight: 30
    },
    navButtons: {
        marginRight: 10
    }
});

const mapStoreToProps = store => {return {} };

const mapDispatchToProps = dispatch => {
    return {
        saveMatch: (rawResult) => dispatch(reduxActions.saveMatch(rawResult))
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(Main);