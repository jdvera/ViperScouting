import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch, ScrollView } from 'react-native';

class Schedule extends React.Component {
    generateTable = () => {
        const tableRows = [];
        this.props.teamArr.forEach((value, i) => {
            const teamsRow = [];
            value.forEach((teamValue, j) => {
                teamsRow.push(
                    <TouchableOpacity
                        style={this.props.i === i && this.props.j === j ? { ...styles.tableColumnSelected, borderLeftWidth: StyleSheet.hairlineWidth } : { ...styles.tableColumn, borderLeftWidth: StyleSheet.hairlineWidth }}
                        onPress={() => this.props.updateMainState({ i, j })}
                        key={j}
                    >
                        <Text>{teamValue}</Text>
                    </TouchableOpacity>
                );
            });
            tableRows.push(
                <View style={styles.tableRow} key={i}>
                    <View style={styles.tableColumn}>
                        <Text>{i + 1}</Text>
                    </View>
                    {teamsRow}
                </View>
            );
        });

        return tableRows;
    };

    render() {
        const { teamArr, i, j } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.tableWrapper}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableHeader}>
                            <Text>Match</Text>
                        </View>
                        <View style={{ ...styles.tableHeader, borderLeftWidth: StyleSheet.hairlineWidth }} />
                        <View style={styles.tableHeader}>
                            <Text>Blue Team</Text>
                        </View>
                        <View style={styles.tableHeader} />
                        <View style={{ ...styles.tableHeader, borderLeftWidth: StyleSheet.hairlineWidth }} />
                        <View style={styles.tableHeader}>
                            <Text>Red Team</Text>
                        </View>
                        <View style={styles.tableHeader} />
                    </View>
                    <ScrollView>
                        {this.generateTable()}
                    </ScrollView>
                </View>
                <View style={styles.row}>
                    <Button title={`Scout ${teamArr[i][j]}`} onPress={() => this.props.updateMainState({ showPage: "prematch" })} />
                    <Button title={`View ${teamArr[i][j]} Details`} onPress={() => this.props.updateMainState({ showPage: "teams" })} />
                </View>
            </View>
        );
    };
};

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
    tableWrapper: {
        flexDirection: "column",
        alignItems: "stretch",
        marginTop: 50,
        marginHorizontal: 5,
        maxHeight: 300,
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
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    tableColumnSelected: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: "limegreen"
    }
});


const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(Schedule);