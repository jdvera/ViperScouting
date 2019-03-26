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
import _get from 'lodash/get';
import NavBar from "./components/NavBar";
import TeamDetails from "./components/TeamDetails";

class Main extends React.Component {
    state = {
        showPage: "sync",

        //Schedule
        teamArr: this.props.matchSchedule,
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

    pageToDisplay = () => {
        let { i } = this.state;
        switch (this.state.showPage) {
            case "schedule":
                return <Schedule updateMainState={this.updateMainState} />;
            case "prematch":
                return <PreMatch updateMainState={this.updateMainState} />;
            case "scouting":
                return <Scouting updateMainState={this.updateMainState} />;
            case "postmatch":
                return <PostMatch updateMainState={this.updateMainState} currentMatch={this.state.match} i={i} saveMatch={this.saveMatch}/>;
            case "teams":
                return <Teams updateMainState={this.updateMainState} />;
            case "teamDetails":
                return <TeamDetails updateMainState={this.updateMainState} />;
            case "sync":
                return <Sync updateMainState={this.updateMainState} />;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <NavBar
                    currentPage={this.state.showPage}
                    updateMainState={this.updateMainState}
                    currentMatch={this.state.currentMatch}
                    currentTeam={this.state.currentTeam}
                />
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
    navButtons: {
        marginRight: 10
    }
});

const mapStateToProps = state => {
    console.log("reloading index props from store");
    return {
        matches: state.schedule.matches,
        matchesLoaded: state.schedule.matchesLoaded,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveMatch: (rawResult) => dispatch(reduxActions.saveMatch(rawResult))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);