import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import * as names from "../names";

const renderAddPurchaseMessage = (transactions, navigator) => {
  if (transactions === null || transactions.length === 0) {
    return (
      <TouchableNativeFeedback onPress={() => navigator.navigate(names.NEW)}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "sans-serif-light",
              fontSize: 36,
              padding: 20
            }}
          >
            Transactions you make with this account Appear Here
          </Text>
          <Icon name="ios-add" size={96} color="gray" />
        </View>
      </TouchableNativeFeedback>
    );
  }
};

const TransactionList = props => (
  <View style={styles.container}>
    {renderAddPurchaseMessage([], props.navigator)}
  </View>
);
export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
