import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import * as reduxActions from "../redux/actions";
import {findNextTeam} from "../redux/selectors";

class ScoutingOptionGroup extends React.Component {
    render() {

        const lastButton = this.props.option.options.length === 3 ? (
            <Button
                title={""}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                type="clear"
                disabled
            />
            ) : null;

        return (
            <View style={styles.postScreenColumn}>
                <View style={{paddingLeft: 25}}>
                    <Text style={styles.optionLabelStyle}>{this.props.option.label}</Text>
                </View>
                <View style={{ ...styles.postScreenRow, justifyContent: "space-between" }} >
                    {this.props.option.options.map((optionValue, index) => (
                        <Button
                            title={optionValue.label}
                            onPress={() => this.props.handleInputChange(this.props.option.name, optionValue.value)}
                            type={this.props.currentVal === optionValue.value ? "solid" : "outline"}
                            buttonStyle={styles.buttonStyle}
                            containerStyle={styles.containerStyle}
                            titleStyle={styles.optionTextStyle}
                            key={index}
                        />
                    ))}
                    {lastButton}
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    // Views
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    actionsContainer: {
        flex: 1,
        flexDirection: "row"
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    divider: {
        backgroundColor: "gray",
        width: StyleSheet.hairlineWidth
    },
    actions: {
        flex: 3,
        flexDirection: "column"
    },
    status: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    postScreenMainColumn: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    postScreenQuestionRow: {
        flexDirection: "row"
    },
    postScreenColumn: {
        flexDirection: "column"
    },
    postScreenRow: {
        flexDirection: "row"
    },

    // Buttons
    startButton: {
        backgroundColor: "aqua",
        height: 100,
        width: 175,
        alignItems: "center",
        justifyContent: "center"
    },
    actionButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },

    // Input Field
    inputStyle: {
        flex: 2,
        borderColor: "grey",
        borderWidth: StyleSheet.hairlineWidth
    },

    // Progress Bar
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column"
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    barText: {
        backgroundColor: "transparent",
        color: "#FFF",
    },
    buttonStyle: {
        height: 100,
        width: 130,
    },
    containerStyle: {
        flex: 1,
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 'auto'
    },
    optionTextStyle: {
        fontSize: 32
    },
    optionLabelStyle: {
        fontSize: 24
    }
});

const mapStateToProps = state => {
    return {
        nextMatch: state.scouting.currentMatch,
        nextTeam: findNextTeam(state),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        savePostMatch: (postMatch, nextMatch, nextTeam) => Promise.resolve(
            dispatch(reduxActions.processMatch(postMatch))
        ).then(() => {
            ownProps.updateMainState({ showPage: "prematch", currentMatch: nextMatch, currentTeam: nextTeam })
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoutingOptionGroup);