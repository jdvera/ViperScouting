import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
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
        teamArr: [6800, 42, 2345, 87],
        match: null,

        // PreMatch
        startHolding: "",
        startHAB: "",
        startConfig: "",

        // Scouting
        events: [],

        // PostMatch
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

    handleChangePage = page => {
        this.setState({ showPage: page });
    };

    updateMainState = (stateObj, nextPage) => {
        this.setState(stateObj, () => {
            console.log(this.state);
            if (nextPage) {
                this.handleChangePage(nextPage);
            }
        });
    };

    showTeamInfo = () => {
        const { showPage, match, teamArr } = this.state;
        if (showPage === "prematch" || showPage === "scouting" || showPage === "postmatch") {
            return <Text>Match: {match + 1} | Team: {teamArr[match]}</Text>
        }
    };

    pageToDisplay = () => {
        switch (this.state.showPage) {
            case "schedule":
                return <Schedule handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} teamArr={this.state.teamArr} />;
            case "prematch":
                return <PreMatch handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
            case "scouting":
                return <Scouting handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
            case "postmatch":
                return <PostMatch handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} currentMatch={this.state.match} />;
            case "teams":
                return <Teams handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
            case "sync":
                return <Sync handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
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

                        <NavButton showPage={this.state.showPage} name="schedule" handleChangePage={this.handleChangePage}>
                            Schedule
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="prematch" handleChangePage={this.handleChangePage}>
                            Pre-Match
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="scouting" handleChangePage={this.handleChangePage}>
                            Scouting
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="postmatch" handleChangePage={this.handleChangePage}>
                            Post Match
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="teams" handleChangePage={this.handleChangePage}>
                            Teams
                        </NavButton>
                        <NavButton showPage={this.state.showPage} name="sync" handleChangePage={this.handleChangePage}>
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

const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(Main);