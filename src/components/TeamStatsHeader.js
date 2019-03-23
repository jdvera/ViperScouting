import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

class TeamStatsHeader extends React.Component {

    render() {
        return (
            <View style={styles.tableHeader}>
                <TouchableOpacity
                    style={{ backgroundColor: this.props.isSelected ? "limegreen" : "white" }}
                    onPress={() => this.props.updateSelectedStat(this.props.statsType)}
                >
                    <Text style={styles.tableText}>{this.props.statsType.label}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    leftBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    tableHeader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderLeftWidth: StyleSheet.hairlineWidth,
        maxWidth: 100
    },
    tableRow: {
        flexDirection: "row",
        minHeight: 15,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tableColumn: {
        flex: 1,
        justifyContent: "center"
    },
    tableText: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontSize: 14
    }
});

export default TeamStatsHeader;