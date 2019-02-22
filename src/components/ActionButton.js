import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';

/*

<ActionButton action="h_" type="pickup" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
    <Text>PickUp Hatch</Text>
</ActionButton>

<ActionButton action="r1" type="action" lastAction={this.state.lastAction} carrying={this.state.carrying} handleButtonPress={this.handleButtonPress}>
    <Text>Rocket 1</Text>
</ActionButton>

*/

class ActionButton extends React.Component {
    render() {
        const { lastAction, carrying, type, handleButtonPress } = this.props || {};
        let { action, children } = this.props || {};
        let btnStyle;

        if (type === "pickup") {
            if (carrying && carrying === action) {
                btnStyle = {
                    style: styles.pickupSelected,
                    disabled: true
                };
            }
            else {
                btnStyle = { style: styles.pickupButton };
            }
        }
        else if (type === "task") {
            if (!carrying) {
                if (lastAction === action) {
                    btnStyle = { style: styles.undoButton };
                    action = "undo";
                    children = <Text>UNDO</Text>;
                }
                else {
                    btnStyle = {
                        style: styles.actionDisabled,
                        disabled: true
                    };
                }
            }
            else {
                btnStyle = { style: styles.actionButton }
            }
        }

        return (
            <TouchableOpacity {...btnStyle} onPress={() => handleButtonPress(type, action)}>
                {children}
            </TouchableOpacity>
        );
    };
};


const styles = StyleSheet.create({
    // pickup buttons
    pickupButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        backgroundColor: "aqua"
    },
    pickupSelected: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        backgroundColor: "limegreen"
    },

    // action buttons
    actionButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        backgroundColor: "aqua"
    },
    actionDisabled: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        backgroundColor: "lightgrey"
    },
    undoButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        backgroundColor: "sienna"
    }
});

export default ActionButton;