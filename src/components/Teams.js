import React from 'react';
import { connect } from 'react-redux';
import {Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TeamRow from "./TeamRow";
import _sortBy from "lodash/sortBy";
import _get from "lodash/get";
import TeamStatsHeader from "./TeamStatsHeader";
import * as reduxActions from "../redux/actions";
import * as statsOrder from '../constants/StatsOrders';


class Teams extends React.Component {

    mainStats = [
        statsOrder.teamNum,
        statsOrder.avePts,
        statsOrder.maxPts,
        statsOrder.avgNonHabPts,
        statsOrder.avgRocketPts,
        statsOrder.avgCargoShipPts,
        statsOrder.avgHabPts,
        statsOrder.avgRocketCargoPts,
        statsOrder.avgRocketHatchPts,
        statsOrder.avgCargoShipCargoPts,
        statsOrder.avgCargoShipHatchPts,
    ];

    state = {
        selectedTeam: null,
        currentStatsType: statsOrder.teamNum,
        teams: _sortBy(this.props.teams, (team) => _get(team, statsOrder.teamNum.path))
    };

    updateSelectedTeam = (teamNum) => {
        this.setState({ selectedTeam: teamNum });
        this.props.setCurrentScoutingDetailsTeam(teamNum);
    };

    updateSelectedStat = (statsType) => {
        this.setState({
            currentStatsType: statsType,
            teams: statsType.invert ?
                _sortBy(this.props.teams, (team) => -1 * _get(team, statsType.path)) :
                _sortBy(this.props.teams, (team) => _get(team, statsType.path))
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tableWrapper}>
                    <ScrollView horizontal>
                        <View style={{flexDirection: "column"}}>
                            <View style={styles.tableRow}>
                                {this.mainStats.map((statsType, index) => (
                                    <TeamStatsHeader
                                        statsType={statsType}
                                        isSelected={this.state.currentStatsType === statsType}
                                        updateSelectedStat={this.updateSelectedStat}
                                        key={index}
                                    />
                                ))}
                            </View>
                            <ScrollView>
                            {this.state.teams.map((team, index) => {
                                // console.log(`Team row ${index} for team ${team.teamNum}:`);
                                // console.log(team);
                                return (
                                    <TeamRow
                                        team={team}
                                        isSelected={this.state.selectedTeam === team.teamNum}
                                        updateSelectedTeam={this.updateSelectedTeam}
                                        key={index}
                                    />
                                )
                            })}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <Button title={`View Team Details`} onPress={() => this.props.updateMainState({ showPage: "teamDetails" })} />
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    // Table
    tableWrapper: {
        // flexDirection: "column",
        alignItems: "stretch",
        marginHorizontal: 5,
        maxHeight: Dimensions.get('window').height * .75,
        width: Dimensions.get('window').width * .95,
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
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderLeftWidth: StyleSheet.hairlineWidth,
        // minWidth: 100
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center",
        // minWidth: 100
    },
    tableText: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontSize: 14
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
});



const mapStateToProps = state => {
    console.log("reloading Teams props from store");
    console.log(`mapStateToProps: currently ${Object.keys(state.teams).length} teams and ${Object.keys(state.results).length} matches`)
    return {
        teams: Object.values(state.teams),
        teamOrder: [],
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setCurrentScoutingDetailsTeam: (teamNum) => Promise.resolve(
            dispatch(reduxActions.setCurrentScoutingDetailsTeam(teamNum))
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);