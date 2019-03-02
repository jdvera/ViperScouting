import React from 'react';
import { connect } from 'react-redux';
// import * as reduxActions from "../redux/actions.js";
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';
// import ActionButton from "./ActionButton.js";
// import AnimatedBar from "./AnimatedBar.js";
import PreMatch from "./components/PreMatch.js";
import Scouting from "./components/Scouting.js";
import PostMatch from "./components/PostMatch.js";


class Main extends React.Component {
    state = {
        showPage: "postmatch"
    };

    handleChangePage = page => {
        this.setState({ showPage: page });
    };

    pageToDisplay = () => {
        switch (this.state.showPage) {
            case "prematch":
                return <PreMatch handleChangePage={this.handleChangePage} />;
            case "scouting":
                return <Scouting handleChangePage={this.handleChangePage} />;
            case "postmatch":
                return <PostMatch handleChangePage={this.handleChangePage} />;
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <NavBar style={styles.navMain}>
                    <NavTitle>
                        {"App"}
                    </NavTitle>
                    <NavButton onPress={() => alert('hi1')}>
                        <NavButtonText>
                            {"Button1"}
                        </NavButtonText>
                    </NavButton>
                    <NavButton onPress={() => alert('hi2')}>
                        <NavButtonText>
                            {"Button2"}
                        </NavButtonText>
                    </NavButton>
                </NavBar>
                {this.pageToDisplay()}
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

    // Nav
    navMain: {
        flex: 1
    },
});

export default Main;