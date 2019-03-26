import React from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Switch,
    ScrollView,
    Dimensions
} from 'react-native';
import * as reduxActions from "../redux/actions";
import {findNextTeam} from "../redux/selectors";
import * as postMatchOptions from '../constants/postMatchOptions';
import ScoutingOptionGroup from "./ScoutingOptionGroup";
import ScheduleRow from "./Schedule";

class PostGame extends React.Component {
    state = {
        // robot info
        broken: null,
        pos: null,
        host: null,
        liftability: 2,
        defense: null
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    canSubmit = () => {
        return this.state.broken !== null &&
            this.state.pos !== null &&
            this.state.host !== null &&
            this.state.liftability !== null &&
            this.state.defense !== null
    }

    submitGameData = () => {
        this.props.savePostMatch(
            this.state,
            this.props.nextMatch,
            this.props.nextTeam
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Post Match Screen</Text>
                <View style={styles.postScreenMainColumn}>
                    <ScrollView>
                        {Object.values(postMatchOptions).map((option, index) => (
                            <ScoutingOptionGroup
                                option={option}
                                handleInputChange={this.handleInputChange}
                                currentVal={this.state[option.name]}
                                key={index}
                            />
                        ))}
                    </ScrollView>
                </View>
                <Button title="submit game data" onPress={this.submitGameData} disabled={!this.canSubmit()}/>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    // Views
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width * .95
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
        width: Dimensions.get('window').width * .95
        // flexDirection: "column",
        // justifyContent: "space-around"
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

export default connect(mapStateToProps, mapDispatchToProps)(PostGame);