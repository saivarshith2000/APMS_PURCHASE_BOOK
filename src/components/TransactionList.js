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
import MoneyListItem from "./MoneyListItem";
import PurchaseListItem from "./PurchaseListItem";

class TransactionList extends React.Component {
  state = {
    transactions: this.props.list,
    dummy: [
      {
        amount: 500,
        remarks: "Some Nice Remarks",
        dateTime: new Date(),
        voucherNumber: "21334",
        chequeNumber: "4567",
        opening: "1000",
        closing: "500",
        title: "Books for Exam",
        category: "stationery",
        type: "add_purchase"
      },
      {
        amount: 800,
        type: "add_money",
        remarks: "Some remark lol",
        dateTime: new Date()
      },
      {
        amount: 500,
        remarks: "This is also a Remarks",
        dateTime: new Date(),
        voucherNumber: "21334",
        chequeNumber: "4567",
        opening: "1000",
        closing: "500",
        title: "Exam Tickers",
        category: "stationery",
        type: "add_purchase"
      },
      {
        amount: 800,
        type: "add_money",
        remarks: "Some remark lol",
        dateTime: new Date()
      },
      {
        amount: 500,
        remarks: "Some Remarks are bad too",
        dateTime: new Date(),
        voucherNumber: "21334",
        chequeNumber: "4567",
        opening: "1000",
        closing: "500",
        title: "New TextBooks",
        category: "stationery",
        type: "add_purchase"
      },
      {
        amount: 800,
        type: "add_money",
        remarks: "Some remark lol",
        dateTime: new Date()
      },
      {
        amount: 500,
        remarks: "Some Useful Remarks",
        dateTime: new Date(),
        voucherNumber: "21334",
        chequeNumber: "4567",
        opening: "1000",
        closing: "500",
        title: "Books for Exam",
        category: "stationery",
        type: "add_purchase"
      },
      {
        amount: 500,
        remarks: "Some Useful Remarks",
        dateTime: new Date(),
        voucherNumber: "21334",
        chequeNumber: "4567",
        opening: "1000",
        closing: "500",
        title: "Books for Exam",
        category: "stationery",
        type: "add_purchase"
      }
    ]
  };

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
      this.state.transactions == null ||
      this.state.transactions.length == 0
    ) {
      return this.renderAddPurchaseMessage(this.props.navigator);
    } else {
      return (
        <View style={{ marginVertical: 10, flex: 1, alignItems: "stretch" }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            data={this.state.dummy}
            renderItem={({ item }) => {
              if (item.type === "add_money") {
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
