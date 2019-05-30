import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ElevatedView from "react-native-elevated-view";

import DateBadge from "./DateBadge";

/*
Props are amount, dateTime, remarks
*/

const MoneyListItem = props => {
  return (
    <ElevatedView style={styles.container} elevation={5}>
      <View style={styles.mainContainer}>
        <View style={styles.dateStyle}>
          <DateBadge dateTime={props.dateTime} />
        </View>
        <View style={styles.TextContainerStyle}>
          <Text style={styles.amountStyle}>Rs. {props.amount}</Text>
          <Text style={styles.remarkStyle}>{props.remarks}</Text>
        </View>
      </View>
    </ElevatedView>
  );
};
export default MoneyListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderColor: "#B2DFDB",
    marginTop: 10,
    minWidth: 390
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
    fontSize: 14,
    paddingTop: 2
  }
});
