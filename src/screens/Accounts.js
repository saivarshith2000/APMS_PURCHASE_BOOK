import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class Accounts extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Accounts",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-balance" size={24} color={tintColor} />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36 }}>Accounts</Text>
      </View>
    );
  }
}

export default Accounts;
