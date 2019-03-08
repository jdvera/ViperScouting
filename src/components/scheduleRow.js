import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import ScheduleTeamCell from "./scheduleTeamCell";

class ScheduleRow extends React.Component {

    render() {
        return (
            <View style={styles.tableRow}>
                {this.props.match.blue.map((teamNum, blueIndex) => (
                    <ScheduleTeamCell
                        matchNumber={this.props.match.matchNumber}
                        alliance="blue"
                        position={blueIndex}
                        teamNum={teamNum}
                        updateMainState={this.props.updateMainState}
                        key={blueIndex}
                    />
                ))}
                <View style={[styles.tableColumn, styles.center, styles.leftBorder]}>
                    <Text>{this.props.match.matchNumber}</Text>
                </View>
                {this.props.match.red.map((teamNum, redIndex) => (
                    <ScheduleTeamCell
                        matchNumber={this.props.match.matchNumber}
                        alliance="red"
                        position={redIndex}
                        teamNum={teamNum}
                        updateMainState={this.props.updateMainState}
                        key={redIndex}
                    />
                ))}
            </View>
        );
    };

}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: "row",
        minHeight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    leftBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth
    },

});

export default ScheduleRow;