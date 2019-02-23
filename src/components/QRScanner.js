'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
class QRScanner extends Component {
 
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.props.gameData}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
 
AppRegistry.registerComponent('QRScanner', () => QRScanner);
 
module.exports = QRScanner;