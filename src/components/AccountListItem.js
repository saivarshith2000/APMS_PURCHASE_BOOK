import React from "react";
import { View, Text, StyleSheet, CheckBox } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import DateBadge from "./DateBadge";

// props are account name, date created on and currentBalance

class AccountListItem extends React.Component {
  state = {
    checked: false
  };

  onPress = () => {
    this.props.onPress();
    this.setState({ checked: !this.state.checked });
  };

  render() {
    console.log(this.props);
    const { createdOn, balance, acccountName } = this.props.account;
    return (
      <View style={styles.container}>
        <DateBadge dateTime={new Date(createdOn)} />
        <View style={styles.detailsStyle}>
          <Text>{acccountName}</Text>
          <Text>Rs. {balance}</Text>
        </View>
        <View>
          <CheckBox
            checkedIcon={<Icon name="check-box" color="green" />}
            uncheckedIcon={
              <Icon name="check-box-outline-blank" color="black" />
            }
            value={this.state.checked}
            onValueChange={this.onPress}
          />
        </View>
      </View>
    );
  }
}
export default AccountListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  detailsStyle: {
    flexDirection: "column"
  }
});
