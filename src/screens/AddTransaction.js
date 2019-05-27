import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { currentTabChanged } from "../actions";
import * as names from "../names";

class AddTransactions extends React.Component {
  static navigationOptions = {
    tabBarLabel: "New",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-add" size={24} color={tintColor} />
    )
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.currentTabChanged(names.NEW);
    });
    // complete the database operation and get the data for the list
    // for temp purposes, we are pulling data from a dummy file
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36 }}>AddTransactions</Text>
      </View>
    );
  }
}

export default withNavigation(
  connect(
    null,
    { currentTabChanged }
  )(AddTransactions)
);
