import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Switch } from 'react-native';

class NavButton extends React.Component {

    render() {
        const { currentPage, name, children, updateMainState } = this.props;

        let buttonDisable = {
            disabled: false
        };
        let textStyle = {
            color: "black"
        };

        if (name === currentPage) {
            textStyle.color = "blue";
        }


        return (
            <TouchableOpacity style={styles.navButton} onPress={() => updateMainState({ showPage: name })} {...buttonDisable}>
                <Text style={{ ...textStyle }}>
                    {this.props.label}
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