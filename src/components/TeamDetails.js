import React from 'react';
import { connect } from 'react-redux';
import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text } from 'react-native-elements';
import _get from "lodash/get";
import _max from 'lodash/max';
import _sum from 'lodash/sum';
import * as statsOrder from '../constants/StatsOrders';
import {findTeam, findTeamMatches} from "../redux/selectors";
import * as eventTypes from '../constants/EventTypes';
import {Grid, StackedBarChart, XAxis} from 'react-native-svg-charts'
import _sortBy from "lodash/sortBy";


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

    hatchMatchStats = [
        eventTypes.scoreHatchCargoShip,
        eventTypes.scoreHatchRocket1,
        eventTypes.scoreHatchRocket2,
        eventTypes.scoreHatchRocket3,
        eventTypes.dropHatch,
    ];

    cargoMatchStats = [
        eventTypes.scoreCargoCargoShip,
        eventTypes.scoreCargoRocket1,
        eventTypes.scoreCargoRocket2,
        eventTypes.scoreCargoRocket3,
        eventTypes.dropCargo,
    ];

    matchStatColors = [
        '#0D4D4D',
        "#9775AA",
        "#764B8E",
        "#3D1255",
        "#801515"
    ];

    getproperty = (statsType) => {
        // console.log(`rendering stat ${statsName} for team ${this.props.team.teamNum}: ${this.props.team[statsName]}`);
        const stat = _get(this.props.team, statsType.path);
        return statsType === statsOrder.teamNum ? stat : stat > 0.001 ? statsType.value(stat).toFixed(3) : '-';
    };

    toDash = (value) => {
        return value > 0.001 ? value : '-';
    };

    renderMatchStats = (matchStats) => {
        const eventLabels = matchStats.map((matchStat) => matchStat.abbr);
        const eventsData = this.props.matches.map((match, matchIndex) =>
            Object.assign(...matchStats.map((matchStat, index) =>
                ({ [matchStat.abbr]: _get(match, `taskMap.${matchStat.abbr}`).length * ((matchStat.points === 0) ? 1 : 1) })
            ))
        );
        const matchNumbers = this.props.matches.map((match) => match.matchNum);
        const maxItemsScored = _max(eventsData.map((event) => _sum(Object.values(event))));

        return (
            <View>
                <View style={{ height: 200 }}>


                    <StackedBarChart
                        style={ { height: 200 } }
                        keys={ eventLabels }
                        colors={ this.matchStatColors }
                        data={ eventsData }
                        showGrid={ true }
                        contentInset={ { top: 30, bottom: 30 } }
                        numberOfTicks = {maxItemsScored}
                    >
                        <Grid/>
                    </StackedBarChart>

                    <XAxis
                        style={{ height: 180, marginHorizontal: 40 }}
                        data={ matchNumbers }
                        formatLabel={ (value, index) => matchNumbers[index] }
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        spacing={0.2}
                    />
                </View>

                <View style={[styles.tableWrapper, {marginTop: 30}]}>
                    <View style={{flexDirection: "column"}}>
                        <View style={styles.tableRow}>
                            <View style={[styles.leftBorder, styles.tableColumn]}>
                                <Text style={styles.tableText}>Match Number</Text>
                            </View>
                            {matchStats.map((matchStat, index) => (
                                <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                    <Text style={styles.tableText}>{matchStat.label}</Text>
                                </View>
                            ))}
                        </View>
                        {this.props.matches.map((match, matchIndex) => (
                            <View style={styles.tableRow} key={matchIndex}>
                                <View style={[styles.leftBorder, styles.tableColumn]}>
                                    <Text style={styles.tableText}>{match.matchNum}</Text>
                                </View>
                                {matchStats.map((matchStat, index) => (
                                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                                        <Text style={styles.tableText}>{this.toDash(_get(match, `taskMap.${matchStat.abbr}`).length)}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );
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

                    <Text h3>Events</Text>
                    <Text h4>Hatch</Text>
                    {this.renderMatchStats(this.hatchMatchStats)}

                    <Text h4>Cargo</Text>
                    {this.renderMatchStats(this.cargoMatchStats)}


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
        matches: _sortBy(findTeamMatches(state, {teamNum: state.scouting.currentScoutingDetailsTeam}), (match) => match.matchNum)
    }
};

export default connect(mapStateToProps)(TeamDetails);