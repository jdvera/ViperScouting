import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
// import ActionButton from "./ActionButton.js";
// import AnimatedBar from "./AnimatedBar.js";
import PreMatch from "./components/PreMatch.js";
import Scouting from "./components/Scouting.js";
import PostMatch from "./components/PostMatch.js";


class Main extends React.Component {
    state = {
        showPage: "prematch",

        // PreMatch
        matchNum: "",
        teamNum: "",

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
        const { showPage, matchNum, teamNum } = this.state;
        if (showPage !== "prematch") {
            if (matchNum.length && teamNum.length) {
                return <Text>Match: {matchNum} | Team: {teamNum}</Text>
            }
        }
    };

    pageToDisplay = () => {
        switch (this.state.showPage) {
            case "prematch":
                return <PreMatch handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
            case "scouting":
                return <Scouting handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
            case "postmatch":
                return <PostMatch handleChangePage={this.handleChangePage} updateMainState={this.updateMainState} />;
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
                        <TouchableOpacity style={styles.navButtons} onPress={() => this.handleChangePage("prematch")}>
                            <Text style={{ color: this.state.showPage === "prematch" ? "blue" : "black" }}>Pre-Match</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButtons} onPress={() => this.handleChangePage("scouting")}>
                            <Text style={{ color: this.state.showPage === "scouting" ? "blue" : "black" }}>Scouting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navButtons} onPress={() => this.handleChangePage("postmatch")}>
                            <Text style={{ color: this.state.showPage === "postmatch" ? "blue" : "black" }}>Post Match</Text>
                        </TouchableOpacity>
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

export default Main;