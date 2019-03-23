import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {findCurrentTeam} from "../redux/selectors";
import NavButton from "./NavButton";

class NavBar extends React.Component {

    showTeamInfo = () => {
        if (this.props.currentPage === "prematch"
            || this.props.currentPage === "scouting"
            || this.props.currentPage === "postmatch") {
            // return <Text style={styles.largerText}>Match: {this.props.matchNum} | Team: {this.props.teamNum}</Text>
            return <Text style={styles.largerText}>Match: {this.props.currentMatch} | Team: {this.props.currentTeam}</Text>
        }
    };

    render() {
        return (
            <View style={styles.navMain}>
                <Text style={styles.largerText}>Viper Scouting</Text>
                {this.showTeamInfo()}
                <View style={styles.row}>
                    <NavButton
                        name="schedule"
                        label="Schedule"
                        currentPage={this.props.currentPage}
                        updateMainState={this.props.updateMainState}
                    />
                    <NavButton
                        name="teams"
                        label="Teams"
                        currentPage={this.props.currentPage}
                        updateMainState={this.props.updateMainState}
                    />
                    <NavButton
                        name="sync"
                        label="Sync"
                        currentPage={this.props.currentPage}
                        updateMainState={this.props.updateMainState}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    navMain: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: "lightgray",
        maxHeight: 50
    },
    row: {
        flexDirection: "row"
    },
    largerText: {
        fontSize: 24
    }

});

const mapStateToProps = state => {
    console.log("reloading NavBar props from store");
    return {
        matchNum: state.scouting.matchNum,
        teamNum: findCurrentTeam(state),
    }
};

export default connect(mapStateToProps)(NavBar);