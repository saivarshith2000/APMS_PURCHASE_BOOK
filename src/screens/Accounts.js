import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import ElevatedView from "react-native-elevated-view";

import { currentTabChanged } from "../actions";
import * as names from "../names";
import {
  TextInput,
  TouchableNativeFeedback
} from "react-native-gesture-handler";

class Accounts extends React.Component {
  state = {
    text: ""
  };

  static navigationOptions = {
    tabBarLabel: "Accounts",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-balance" size={24} color={tintColor} />
    )
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.props.currentTabChanged(names.ACCOUNTS);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  onChangeText = () => {
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <ElevatedView elevation={10} style={styles.formContainer}>
          <TextInput
            style={styles.formInputStyle}
            onChangeText={text => this.onChangeText(text)}
            placeholder="Add Account"
          />
          <TouchableNativeFeedback style={styles.ButtonContainerStyle}>
            <Text style={styles.ButtonTextStyle}>Add</Text>
          </TouchableNativeFeedback>
        </ElevatedView>
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

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  formContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  formInputStyle: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7
  },
  ButtonContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10
  },
  ButtonTextStyle: {
    fontSize: 20,
    color: "green"
  }
});
