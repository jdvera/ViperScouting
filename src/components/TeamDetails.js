import React from 'react';
import { connect } from 'react-redux';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text } from 'react-native-elements';
import _get from "lodash/get";
import * as statsOrder from '../constants/StatsOrders';
import {findTeam, findTeamMatches} from "../redux/selectors";
import * as eventTypes from '../constants/EventTypes';


class TeamDetails extends React.Component {

    hatchStats = [
        statsOrder.avgCargoShipHatchPts,
        statsOrder.avgRocketHatchPts,
        statsOrder.avgRocketLvl1HatchPts,
        statsOrder.avgRocketLvl2HatchPts,
        statsOrder.avgRocketLvl3HatchPts,
    ];

    cargoStats = [
        statsOrder.avgCargoShipCargoPts,
        statsOrder.avgRocketCargoPts,
        statsOrder.avgRocketLvl1CargoPts,
        statsOrder.avgRocketLvl2CargoPts,
        statsOrder.avgRocketLvl3CargoPts,
    ];

    statsLabels = [
        "",
        "Average Cargo Ship Points",
        "Average Rocket Points",
        "Average Rocket Lvl1 Points",
        "Average Rocket Lvl2 Points",
        "Average Rocket Lvl3 Points",
    ];

    matchStats = [
        eventTypes.scoreHatchCargoShip,
        eventTypes.scoreHatchRocket1,
        eventTypes.scoreHatchRocket2,
        eventTypes.scoreHatchRocket3,
        eventTypes.scoreCargoCargoShip,
        eventTypes.scoreCargoRocket1,
        eventTypes.scoreCargoRocket2,
        eventTypes.scoreCargoRocket3,
        eventTypes.dropHatch,
        eventTypes.dropCargo,
    ];

    getproperty = (statsType) => {
        // console.log(`rendering stat ${statsName} for team ${this.props.team.teamNum}: ${this.props.team[statsName]}`);
        const stat = _get(this.props.team, statsType.path);
        return statsType === statsOrder.teamNum ? stat : stat > 0.001 ? statsType.value(stat).toFixed(3) : '-';
    };

    toDash = (value) => {
        return value > 0.001 ? value : '-';
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text h2>Team {this.props.team.teamNum}</Text>


                    <Text h4>Averages</Text>
                    <View style={styles.tableWrapper}>
                        <View style={{flexDirection: "column"}}>
                            <View style={styles.tableRow}>
                                {this.statsLabels.map((statsLabel, index) => (
                                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                        <Text style={styles.tableText}>{statsLabel}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.tableRow}>
                                <View style={[styles.leftBorder, styles.tableColumn]}>
                                    <Text style={styles.tableText}>Hatch</Text>
                                </View>
                                {this.hatchStats.map((hatchStat, index) => (
                                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                        <Text style={styles.tableText}>{this.getproperty(hatchStat)}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.tableRow}>
                                <View style={[styles.leftBorder, styles.tableColumn]}>
                                    <Text style={styles.tableText}>Cargo</Text>
                                </View>
                                {this.cargoStats.map((cargoStat, index) => (
                                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                        <Text style={styles.tableText}>{this.getproperty(cargoStat)}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>


                    <Text h4>Events</Text>
                    <View style={styles.tableWrapper}>
                        <View style={{flexDirection: "column"}}>
                            <View style={styles.tableRow}>
                                <View style={[styles.leftBorder, styles.tableColumn]}>
                                    <Text style={styles.tableText}>Match Number</Text>
                                </View>
                                {this.matchStats.map((matchStats, index) => (
                                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                        <Text style={styles.tableText}>{matchStats.label}</Text>
                                    </View>
                                ))}
                            </View>
                            {this.props.matches.map((match, matchIndex) => (
                                <View style={styles.tableRow} key={matchIndex}>
                                    <View style={[styles.leftBorder, styles.tableColumn]}>
                                        <Text style={styles.tableText}>{match.matchNum}</Text>
                                    </View>
                                    {this.matchStats.map((matchStats, index) => (
                                        <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                            <Text style={styles.tableText}>{this.toDash(_get(match, `taskMap.${matchStats.abbr}`).length)}</Text>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
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
    }
});



const mapStateToProps = state => {
    console.log("reloading TeamDetails props from store");
    console.log(`mapStateToProps: currently loading team ${state.scouting.currentScoutingDetailsTeam} details`)
    return {
        team: findTeam(state, {teamNum: state.scouting.currentScoutingDetailsTeam}),
        matches: findTeamMatches(state, {teamNum: state.scouting.currentScoutingDetailsTeam})
    }
};

export default connect(mapStateToProps)(TeamDetails);