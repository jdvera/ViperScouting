import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import * as statsOrder from '../constants/StatsOrders';
import _get from "lodash/get";

class TeamRow extends React.Component {

    getproperty = (statsType) => {
        // console.log(`rendering stat ${statsName} for team ${this.props.team.teamNum}: ${this.props.team[statsName]}`);
        const stat = _get(this.props.team, statsType.path);
        return statsType === statsOrder.teamNum ? stat : stat > 0.001 ? statsType.value(stat).toFixed(3) : '-';
    };

    render() {
        // console.log(`rendering row for team ${this.props.team.teamNum}: selected: ${this.props.isSelected}`);
        return (
            <View style={styles.tableRow}>
                {Object.values(statsOrder).map((statsType, index) => (
                    <View style={[styles.leftBorder, styles.tableColumn]} key={index}>
                        <TouchableOpacity
                            style={{ backgroundColor: this.props.isSelected ? "limegreen" : "azure" }}
                            onPress={() => this.props.updateSelectedTeam(this.props.team.teamNum)}
                        >
                            <Text style={styles.tableText}>{this.getproperty(statsType)}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    leftBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    tableRow: {
        flexDirection: "row",
        minHeight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center",
        width: 100
    },
    tableText: {
        paddingHorizontal: 20,
        paddingVertical: 5
    }
});

export default TeamRow;