import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';

class NavButton extends React.Component {

    render() {
        const { showPage, name, children } = this.props;

        let buttonDisable = {
            disabled: false
        };
        let textStyle = {
            color: "black"
        };

        // if (showPage === "scouting" || showPage === "postmatch") {
        //     buttonDisable.disabled = true;
        // }

        if (name === showPage) {
            textStyle.color = "blue";
        }


        return (
            <TouchableOpacity style={styles.navButton} onPress={() => this.props.handleChangePage(name)} {...buttonDisable}>
                <Text style={{ ...textStyle }}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    };
};

const styles = StyleSheet.create({
    navButton: {
        marginRight: 10
    }
});

export default NavButton;