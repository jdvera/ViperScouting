import React from 'react';
import { connect } from 'react-redux';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {findCurrentTeam} from "../redux/selectors";
import TeamRow from "./TeamRow";

class Teams extends React.Component {


    updateSelectedTeam = (teamNum) => {
        this.setState({ selectedTeam: teamNum })
    };

    render() {
        return (
            <View style={styles.container}>
                {this.props.teamOrder.map((teamNum) => (
                    <TeamRow team={this.props.teams}/>
                ))}
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



const mapStateToProps = state => {
    console.log("reloading Teams props from store");
    return {
        teams: state.teams,
        teamOrder: [],
    }
};

export default connect(mapStateToProps)(Teams);