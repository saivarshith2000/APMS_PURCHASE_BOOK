import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class AddPurchaseTab extends Component {
  static navigationOptions = {
    tabBarLabel: "Add Purchase"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>AddPurchaseTab</Text>
      </View>
    );
  }
}
export default AddPurchaseTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
