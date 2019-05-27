import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { currentTabChanged } from "../actions";
import * as names from "../names";

class Accounts extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Accounts",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-balance" size={24} color={tintColor} />
    )
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.currentTabChanged(names.ACCOUNTS);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 36 }}>Accounts</Text>
      </View>
    );
  }
}

export default withNavigation(
  connect(
    null,
    { currentTabChanged }
  )(Accounts)
);
