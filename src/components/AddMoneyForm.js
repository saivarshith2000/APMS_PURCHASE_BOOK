import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import Icon from "react-native-vector-icons/Ionicons";

import { createMoneyTransaction } from "../createTransaction";
import MoneyInput from "./MoneyInput";
import DateInput from "./DateInput";

class AddMoneyForm extends Component {
  state = {
    amount: "",
    amountError: "",
    remarks: "",
    date: new Date()
  };

  resetForm = () => {
    this.setState({
      amount: "",
      amountError: "",
      remarks: "",
      date: new Date()
    });
  };

  setAmount = amount => {
    this.setState({ amount });
  };

  onRemarksChange = remarks => {
    this.setState({ remarks });
  };

  setDate = date => {
    this.setState({ date });
  };

  validateForm = () => {
    let retVal = true;
    if (this.state.amount.length === 0 || isNaN(this.state.amount)) {
      this.setState({ amountError: "Amount must be a number" });
      retVal = false;
    } else {
      this.setState({ amountError: "" });
    }
    return retVal;
  };

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={10} style={styles.elevatedViewStyle}>
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={styles.formTitleStyle}>Add Money</Text>
            <Icon
              name="ios-refresh"
              size={24}
              style={{ marginLeft: "auto", marginRight: 10 }}
              onPress={this.resetForm}
            />
          </View>
          <MoneyInput
            setAmount={this.setAmount}
            error={this.state.amountError}
          />
          <DateInput setDate={this.setDate} />
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Any Remarks ?"
              onChangeText={remarks => this.onRemarksChange(remarks)}
              value={this.state.remarks}
            />
          </View>
          <TouchableNativeFeedback
            onPress={() => {
              if (this.validateForm()) {
                // add to db if the form is verified
                const { amount, remarks, date } = this.state;
                this.props.addNewTransaction(
                  createMoneyTransaction(amount, 1, date, remarks)
                );
              }
            }}
          >
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </ElevatedView>
      </View>
    );
  }
}
export default AddMoneyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#B2DFDB"
  },
  elevatedViewStyle: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    minHeight: 300,
    minWidth: 350
  },
  formTitleStyle: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: "600",
    marginLeft: "auto"
  },
  textInputStyle: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 15,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    color: "gray"
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#00796B",
    marginHorizontal: 50,
    marginVertical: 20
  },
  buttonTextStyle: {
    fontSize: 16,
    padding: 5,
    margin: 5,
    color: "black"
  }
});