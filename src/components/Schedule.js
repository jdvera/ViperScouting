import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch, ScrollView, Dimensions } from 'react-native';

class Schedule extends React.Component {
    generateTable = () => {
        const tableRows = [];
        this.props.teamArr.forEach((value, i) => {
            const blueTeam = [];
            const redTeam = [];
            value.forEach((teamValue, j) => {
                let arr = blueTeam;
                if (j > 2) arr = redTeam;
                arr.push(
                    <View style={[styles.leftBorder, styles.tableColumn]} key={j}>
                        <TouchableOpacity
                            style={{ backgroundColor: this.props.i === i && this.props.j === j ? "limegreen" : "azure" }}
                            onPress={() => this.props.updateMainState({ i, j })}
                            disabled={this.props.i === i && this.props.j === j}
                        >
                            <Text style={styles.tableText}>{teamValue}</Text>
                        </TouchableOpacity>
                    </View>
                );
            });
            tableRows.push(
                <View style={styles.tableRow} key={i}>
                    {blueTeam}
                    <View style={[styles.tableColumn, styles.center, styles.leftBorder]}>
                        <Text>{i + 1}</Text>
                    </View>
                    {redTeam}
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


const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(Schedule);