import React from "react";
import {
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Alert,
  CheckBox
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

import { persistor } from "../reducers/configureStore";
import { setCurrentAccount, deleteAccount } from "../actions/";
import DateBadge from "./DateBadge";
import { TouchableOpacity } from "react-native-gesture-handler";

// props are account name, date created on and currentBalance

class AccountListItem extends React.Component {
  onPress = () => {
    if (this.props.currentAccount.id === this.props.account.id) {
      this.props.setCurrentAccount({});
      return;
    }
    this.props.setCurrentAccount(this.props.account);
  };

  onLongPress = () => {
    // show a dialog asking if the user wants to delete this account
    Alert.alert(
      "Delete Account ?",
      `The account ${
        this.props.account.accountName
      } will be permanently deleted and it can not be undone ! Are you sure you want to delete ?`,
      [
        {
          text: "confirm",
          onPress: () => {
            // delete this account
            this.props.deleteAccount(this.props.account);
            // immediately persist this state
            persistor.flush();
          }
        },
        {
          text: "cancel",
          onPress: () => {}
        }
      ]
    );
  };

  render() {
    const { createdOn, balance, accountName } = this.props.account;
    return (
      <TouchableNativeFeedback onLongPress={this.onLongPress}>
        <View style={styles.container}>
          <View
            style={{
              alignItems: "flex-start",
              marginRight: 5,
              marginBottom: 5
            }}
          >
            <DateBadge dateTime={new Date(createdOn)} />
          </View>
          <View style={styles.detailsStyle}>
            <Text style={styles.nameStyle}>{accountName}</Text>
            <Text style={styles.balanceStyle}>Balance Rs. {balance}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.onPress}>
              <CheckBox
                checkedIcon={<Icon name="check-box" color="green" />}
                uncheckedIcon={
                  <Icon name="check-box-outline-blank" color="black" />
                }
                value={this.props.account.id === this.props.currentAccount.id}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentAccount: state.currentAccount
  };
};

export default connect(
  mapStateToProps,
  { setCurrentAccount, deleteAccount }
)(AccountListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingVertical: 8
  },
  detailsStyle: {
    flex: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 8,
    flexDirection: "column"
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "black"
  },
  balanceStyle: {
    fontSize: 20
  }
});
