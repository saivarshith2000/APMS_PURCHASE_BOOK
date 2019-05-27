import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class AddMoney extends Component {
  static navigationOptions = {
    tabBarLabel: "Add Money"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>AddMoney</Text>
      </View>
    );
  }
}
export default AddMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
