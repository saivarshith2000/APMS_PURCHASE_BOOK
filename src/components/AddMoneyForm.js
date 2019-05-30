import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";
import ElevatedView from "react-native-elevated-view";

import { createMoneyTransaction } from "../createTransaction";
import MoneyInput from "./MoneyInput";
import DateInput from "./DateInput";

class AddMoneyForm extends Component {
  state = {
    amount: "",
    remarks: "",
    isPickerVisible: false,
    date: new Date()
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
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={10} style={styles.elevatedViewStyle}>
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.formTitleStyle}>Add Money</Text>
          </View>
          <MoneyInput setAmount={this.setAmount} />
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
    fontWeight: "600"
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
