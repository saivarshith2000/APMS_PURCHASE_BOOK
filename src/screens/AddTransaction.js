import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class AddTransactions extends React.Component {
  static navigationOptions = {
    tabBarLabel: "New",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-add" size={24} color={tintColor} />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36 }}>AddTransactions</Text>
      </View>
    );
  }
}

export default AddTransactions;
