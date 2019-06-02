import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import * as names from "../names";
import * as types from "../types";
import MoneyListItem from "./MoneyListItem";
import PurchaseListItem from "./PurchaseListItem";

class TransactionList extends React.Component {
  renderAddPurchaseMessage = navigator => {
    return (
      <TouchableNativeFeedback onPress={() => navigator.navigate(names.NEW)}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.messageTextStyle}>
            Transactions you make with this account Appear Here
          </Text>
          <Icon name="ios-add" size={96} color="gray" />
        </View>
      </TouchableNativeFeedback>
    );
  };

  renderList() {
    if (
      this.props.transactions == null ||
      this.props.transactions.length == 0
    ) {
      return this.renderAddPurchaseMessage(this.props.navigator);
    } else {
      return (
        <View style={{ marginVertical: 10, flex: 1, alignItems: "stretch" }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            data={this.props.transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (item.type === types.ADD_MONEY) {
                const { amount, remarks, dateTime } = item;
                return (
                  <MoneyListItem
                    amount={amount}
                    remarks={remarks}
                    dateTime={dateTime}
                  />
                );
              }
              return <PurchaseListItem purchase={item} />;
            }}
          />
        </View>
      );
    }
  }

  render() {
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}
export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  messageTextStyle: {
    fontFamily: "sans-serif-light",
    fontSize: 36,
    padding: 20
  }
});
