import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import AnimatedBar from "react-native-animated-bar";
import moment from "moment";

export default class App extends React.Component {
  state = {
    showStart: true,
    intervalId: null,
    startTime: null,
    time: 0,
    carrying: null,
    events: []
  };

  handleButtonPress = action => {
    if (this.state.intervalId) {
      console.log("action " + action + ",  at time " + this.state.time);
      const { events, time, carrying } = this.state;
      const event = { time };
      const stateObj = { events };
      if (action === "h" || action === "c") {
        event.type = action;
        stateObj.carrying = action;
      }
      else {
        event.type = action + "_" + carrying;
        stateObj.carrying = null;
      }
      events.push(event);
      this.setState(stateObj, () => console.log(events));
    }
  }

  startTimer = () => {
    if (!this.state.intervalId) {
      const intervalId = setInterval(() => {
        let { startTime } = this.state;
        time = Date.now() - startTime;
        const stateObj = { time };
        if (time > 119999) {
          clearTimeout(intervalId);
          stateObj.intervalId = null;
          stateObj.time = 120000;
        }
        this.setState(stateObj);
      }, 100);

      this.setState({
        intervalId,
        showStart: false,
        startTime: Date.now()
      });
    }
  };

  stopTimer = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({
        showStart: true,
        intervalId: null,
        time: 0
      });
    }
  };

  displayTime = () => {
    let { time } = this.state;

    let minutes = Math.floor(time / 60000);
    time = time - (minutes * 60000);

    let seconds = Math.floor(time / 1000);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let mili = (time - (seconds * 1000) + "").padStart(3, "0");

    return minutes + ":" + seconds + "." + mili;
  }

  render() {
    if (this.state.showStart) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text>Start Match</Text>
          <TouchableOpacity style={styles.startButton} onPress={this.startTimer}>
            <Text>Start Game</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.actionContainer}>
          <View style={styles.pickup}>
            <TouchableOpacity style={styles.pickupButton} onPress={() => this.handleButtonPress("h")}>
              <Text>PickUp Hatch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pickupButton} onPress={() => this.handleButtonPress("c")}>
              <Text>PickUp Cargo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            {/* intentionally left blank */}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => this.handleButtonPress("dp")}>
              <Text>Drop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => this.handleButtonPress("cs")}>
              <Text>Cargo Ship</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => this.handleButtonPress("r1")}>
              <Text>Rocket 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => this.handleButtonPress("r2")}>
              <Text>Rocket 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => this.handleButtonPress("r3")}>
              <Text>Rocket 3</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AnimatedBar
          progress={this.state.time / 120000}
          height={null}
          borderColor="#DDD"
          barColor="tomato"
          borderRadius={5}
          borderWidth={5}
          duration={100}
        >
          <View style={[styles.row, styles.center]}>
            {this.state.time !== 120000 ?
              <Text style={[styles.barText, { fontSize: 30 }]}>
                {this.displayTime()}
              </Text> :
              <Button title="Submit" onPress={() => console.log("submitted")} />
            }
          </View>
        </AnimatedBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Views
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row"
  },
  pickup: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch",
    // backgroundColor: "maroon"
  },
  divider: {
    backgroundColor: "gray",
    width: 10
  },
  actions: {
    flex: 3,
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
    // backgroundColor: "silver"
  },

  // Buttons
  startButton: {
    backgroundColor: "aqua",
    height: 100,
    width: 175,
    alignItems: "center",
    justifyContent: "center"
  },
  pickupButton: {
    backgroundColor: "aqua",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  actionButton: {
    backgroundColor: "aqua",
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },


  row: {
    flexDirection: "row",
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
