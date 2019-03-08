import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

import * as reduxActions from "../redux/actions";

class ScheduleTeamCell extends React.Component {

    render() {
        const { matchNumber, alliance, position} = this.props;
        return (
            <View
                style={[styles.leftBorder, styles.tableColumn]}
            >
                <TouchableOpacity
                    style={{ backgroundColor: this.props.isSelected ? "limegreen" : "azure" }}
                    onPress={() => this.props.setScoutingInfo(matchNumber, alliance, position)}
                >
                    <Text style={styles.tableText}>{this.props.teamNum}</Text>
                </TouchableOpacity>
            </View>
        );
    };

}
const styles = StyleSheet.create({
    leftBorder: {
        borderLeftWidth: StyleSheet.hairlineWidth
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

const mapStateToProps = (state, ownProps) => {
    const { matchNumber, alliance, position } = ownProps;
    return {
        isSelected: matchNumber === state.scouting.currentMatch &&
                    alliance    === state.scouting.alliance &&
                    position    === state.scouting.position,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setScoutingInfo: (currentMatch, alliance, position) => Promise.resolve(
                dispatch(reduxActions.updateScoutingInfo(currentMatch, alliance, position))
            ).then(() => {
                ownProps.updateMainState({ currentMatch: ownProps.matchNumber, currentTeam: ownProps.teamNum, showPage: "prematch" })
            })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTeamCell);