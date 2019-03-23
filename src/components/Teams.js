import React from 'react';
import { connect } from 'react-redux';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TeamRow from "./TeamRow";
import _sortBy from "lodash/sortBy";
import _get from "lodash/get";
import * as statsOrder from '../constants/StatsOrders';
import TeamStatsHeader from "./TeamStatsHeader";


class Teams extends React.Component {

    state = {
        selectedTeam: null,
        currentStatsType: statsOrder.teamNum,
        teams: _sortBy(this.props.teams, (team) => _get(team, statsOrder.teamNum.path))
    };

    updateSelectedTeam = (teamNum) => {
        this.setState({ selectedTeam: teamNum })
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
                    <View style={styles.tableRow}>
                        {Object.values(statsOrder).map((statsType, index) => (
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
                        // console.log(`Team row ${index} for team ${team.teamNum}`)
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
        flexDirection: "column",
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
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderLeftWidth: StyleSheet.hairlineWidth,
        minWidth: 100
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center",
        minWidth: 100
    },
    tableText: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 14
    }
});



const mapStateToProps = state => {
    console.log("reloading Teams props from store");
    console.log(`mapStateToProps: currently ${Object.keys(state.teams).length} teams and ${Object.keys(state.results).length} matches`)
    return {
        teams: Object.values(state.teams),
        teamOrder: [],
    }
};

export default connect(mapStateToProps)(Teams);