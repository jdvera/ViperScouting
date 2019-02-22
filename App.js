import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import AnimatedBar from "./AnimatedBar.js";
// import moment from "moment";

export default class App extends React.Component {
  state = {
    showStart: true,
    postMatch: false,
    intervalId: null,
    startTime: null,
    time: 0,
    prog: 0,
    carrying: null,
    events: []
  };

  handleButtonPress = action => {
    if (this.state.intervalId) {
      const { events, carrying, startTime } = this.state;
      const time = Date.now() - startTime;
      const event = { time };
      const stateObj = { events };
      if (!carrying && (action === "h" || action === "c")) {
        event.type = action;
        stateObj.carrying = action;
        events.push(event);
        this.setState(stateObj, () => console.log(events));
      }
      else if (carrying && action !== "h" && action !== "c") {
        event.type = action + "_" + carrying;
        stateObj.carrying = null;
        events.push(event);
        this.setState(stateObj, () => console.log(events));
      }
    }
  };

  startTimer = () => {
    if (!this.state.intervalId) {
      const intervalId = setInterval(() => {
        let { startTime } = this.state;
        time = Date.now() - startTime;
        const stateObj = { time };
        if (time > 19999) {
          clearInterval(intervalId);
          stateObj.intervalId = null;
          stateObj.time = 20000;
        }
        this.setState(stateObj);
      }, 200);

      this.setState({
        intervalId,
        showStart: false,
        startTime: Date.now()
      }, () => this.setState({ prog: 1 }));
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
  };

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
    else if (this.state.postMatch) {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text>Post Match Screen</Text>
        </View>
      )
    }

    let pickupStyle;
    let actionStyle;

    if (this.state.carrying) {
      pickupStyle = {
        style: { ...styles.actionButton, backgroundColor: "lightgrey" },
        disabled: true
      };
      actionStyle = {
        style: { ...styles.actionButton, backgroundColor: "aqua" }
      }
    }
    else {
      pickupStyle = {
        style: { ...styles.actionButton, backgroundColor: "aqua" }
      };
      actionStyle = {
        style: { ...styles.actionButton, backgroundColor: "lightgrey" },
        disabled: true
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.actionsContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity {...pickupStyle} onPress={() => this.handleButtonPress("h")}>
              <Text>PickUp Hatch</Text>
            </TouchableOpacity>
            <TouchableOpacity {...pickupStyle} onPress={() => this.handleButtonPress("c")}>
              <Text>PickUp Cargo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            {/* intentionally left blank */}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity {...actionStyle} onPress={() => this.handleButtonPress("r1")}>
              <Text>Rocket 1</Text>
            </TouchableOpacity>
            <TouchableOpacity {...actionStyle} onPress={() => this.handleButtonPress("dp")}>
              <Text>Drop</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            {/* intentionally left blank */}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity {...actionStyle} onPress={() => this.handleButtonPress("r2")}>
              <Text>Rocket 2</Text>
            </TouchableOpacity>
            <TouchableOpacity {...actionStyle} onPress={() => this.handleButtonPress("cs")}>
              <Text>Cargo Ship</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            {/* intentionally left blank */}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity {...actionStyle} onPress={() => this.handleButtonPress("r3")}>
              <Text>Rocket 3</Text>
            </TouchableOpacity>
            <View style={styles.actionButton}>
              {/* intentionally left blank */}
            </View>
          </View>
        </View>

        <AnimatedBar
          progress={this.state.prog}
          height={null}
          borderColor="#DDD"
          barColor="tomato"
          borderRadius={5}
          borderWidth={5}
          duration={20000}
        >
          <View style={[styles.row, styles.center]}>
            {this.state.time !== 20000 ?
              <Text style={[styles.barText, { fontSize: 30 }]}>
                {this.displayTime()}
              </Text> :
              <Button title="Submit" onPress={() => this.setState({ postMatch: true })} />
            }
          </View>
        </AnimatedBar>
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
  test: {
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
    flex: 1,
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
