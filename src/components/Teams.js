import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import {findCurrentTeam} from "../redux/selectors";

class Teams extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Team {this.props.teamNum} Page</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});



const mapStateToProps = state => {
    console.log("reloading Teams props from store");
    return {
        teamNum: findCurrentTeam(state),
    }
};

export default connect(mapStateToProps)(Teams);