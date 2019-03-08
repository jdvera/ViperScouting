import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch, ScrollView, Dimensions } from 'react-native';
import ScheduleRow from "./scheduleRow";
import {findCurrentTeam} from "../redux/selectors";

class Schedule extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tableWrapper}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableHeader, styles.blueBackground]} />
                        <View style={[styles.tableHeader, styles.blueBackground]} >
                            <Text>Blue Team</Text>
                        </View>
                        <View style={[styles.tableHeader, styles.blueBackground]} />
                        <View style={[styles.tableHeader, styles.leftBorder]}>
                            <Text>Match</Text>
                        </View>
                        <View style={[styles.tableHeader, styles.redBackground, styles.leftBorder]} />
                        <View style={[styles.tableHeader, styles.redBackground]}>
                            <Text>Red Team</Text>
                        </View>
                        <View style={[styles.tableHeader, styles.redBackground]} />
                    </View>
                    <ScrollView>
                        {this.props.matches.map((match, matchIndex) => (
                            <ScheduleRow match={match} key={matchIndex} updateMainState={this.props.updateMainState}/>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <Button title={`Scout ${this.props.currentTeamNum}`} onPress={() => this.props.updateMainState({ showPage: "prematch" })} />
                    <Button title={`View ${this.props.currentTeamNum} Details`} onPress={() => this.props.updateMainState({ showPage: "teams" })} />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    leftBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    blueBackground: {
        backgroundColor: "lightskyblue"
    },
    redBackground: {
        backgroundColor: "lightsalmon"
    },

    // Table
    tableWrapper: {
        flexDirection: "column",
        alignItems: "stretch",
        marginHorizontal: 5,
        maxHeight: Dimensions.get('window').height * .75,
        borderWidth: StyleSheet.hairlineWidth
    },
    tableRow: {
        flexDirection: "row",
        minHeight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tableHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center"
    },
    tableText: {
        paddingHorizontal: 20,
        paddingVertical: 5
    }
});


const mapStateToProps = state => {
    console.log("reloading schedule props from store");
    return {
        matches: state.schedule.matches,
        matchesLoaded: state.schedule.matchesLoaded,
        currentTeamNum: findCurrentTeam(state)
    };
};

export default connect(mapStateToProps)(Schedule);