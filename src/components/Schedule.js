import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';

class Schedule extends React.Component {
    generateTable = () => {
        const tableRows = [];
        this.props.teamArr.forEach((value, i) => {
            tableRows.push(
                <View style={styles.tableRow} key={i}>
                    <View style={styles.tableColumn}>
                        <Text>{i + 1}</Text>
                    </View>
                    <View style={styles.tableColumn}>
                        <Text>{value}</Text>
                    </View>
                    <View style={styles.tableColumn}>
                        <Button title="Start Scouting" onPress={() => this.startScouting(i, value)} />
                    </View>
                </View>
            );
        });

        return tableRows;
    };

    startScouting = (match, team) => {
        this.props.updateMainState({ match, team }, "prematch");
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tableWrapper}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColumn}>
                            <Text>Match</Text>
                        </View>
                        <View style={styles.tableColumn}>
                            <Text>Team</Text>
                        </View>
                        <View style={styles.tableColumn} />
                    </View>
                    {this.generateTable()}
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
    tableWrapper: {
        flexDirection: "column",
        alignItems: "stretch"
    },
    tableRow: {
        flexDirection: "row"
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black"
    }
});


const mapStoreToProps = store => {
    return { ...store };
};

export default connect(mapStoreToProps)(Schedule);