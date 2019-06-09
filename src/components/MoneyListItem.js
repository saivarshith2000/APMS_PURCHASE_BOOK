import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableNativeFeedback
} from "react-native";
import { connect } from "react-redux";
import ElevatedView from "react-native-elevated-view";

import DateBadge from "./DateBadge";
import { deleteTransaction } from "../actions";

/*
Props are amount, dateTime, remarks
*/

class MoneyListItem extends React.Component {
  onLongPress = () => {
    // show a dialog asking if the user wants to delete this transaction
    Alert.alert(
      "Edit/Delete Transaction ?",
      `Editing or Deleting is permanent and can't be undone. Are you sure ?`,
      [
        {
          text: "cancel",
          onPress: () => {}
        },
        {
          text: "Delete",
          onPress: () => {
            // delete this account
            this.props.deleteTransaction(this.props.money);
            // immediately persist this state
          }
        }
      ]
    );
  };

  render() {
    const { amount, remarks, dateTime } = this.props.money;

    return (
      <ElevatedView
        style={{
          ...styles.container,
          width: (Dimensions.get("window").width * 10) / 11
        }}
        elevation={5}
      >
        <TouchableNativeFeedback onLongPress={this.onLongPress}>
          <View style={styles.mainContainer}>
            <View style={styles.dateStyle}>
              <DateBadge dateTime={new Date(dateTime)} />
            </View>
            <View style={styles.TextContainerStyle}>
              <Text style={styles.amountStyle}>Rs. {amount}</Text>
              <Text style={styles.remarkStyle}>{remarks}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ElevatedView>
    );
  }
}
export default connect(
  null,
  { deleteTransaction }
)(MoneyListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 5,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderColor: "#B2DFDB",
    margin: 10,
    width: 380
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row"
  },
  dateStyle: {
    borderColor: "gray",
    borderRightWidth: 0.5
  },
  TextContainerStyle: {
    flex: 1,
    flexDirection: "column",
    margin: 10
  },
  amountStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderColor: "gray"
  },
  remarkStyle: {
    flex: 1,
    fontSize: 16,
    paddingTop: 2
  }
});
