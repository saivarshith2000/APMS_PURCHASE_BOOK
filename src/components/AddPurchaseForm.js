import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import ElevatedView from "react-native-elevated-view";

import { createPurchaseTransaction } from "../createTransaction";
import MoneyInput from "./MoneyInput";
import DateInput from "./DateInput";
import FormTextInput from "./FormTextInput";
import AutoCompleteInput from "./AutoCompleteInput";

class AddPurchaseForm extends Component {
  state = {
    title: "",
    amount: "",
    remarks: "",
    isPickerVisible: false,
    date: new Date(),
    voucherNumber: "",
    chequeNumber: "",
    category: ""
  };

  setAmount = amount => {
    this.setState({ amount });
  };

  onTitleChange = title => {
    this.setState({ title });
  };

  onRemarksChange = remarks => {
    this.setState({ remarks });
  };

  setDate = date => {
    this.setState({ date });
  };

  onVoucherChange = voucherNumber => {
    this.setState({ voucherNumber });
  };

  onChequeChange = chequeNumber => {
    this.setState({ chequeNumber });
  };

  onCategoryChange = category => {
    this.setState({ category });
  };

  formValidate = () => {
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={10} style={styles.elevatedViewStyle}>
          <View style={styles.titleStyle}>
            <Text style={styles.formTitleStyle}>Add New Purchase</Text>
          </View>
          <FormTextInput
            placeholder="Title *"
            onTextChange={this.onTitleChange}
            pattern={/\S+/}
          />
          <MoneyInput setAmount={this.setAmount} />
          <DateInput setDate={this.setDate} />
          <AutoCompleteInput
            placeholder="Select Category *"
            onTextChange={this.onCategoryChange}
            pattern={/\S+/}
          />
          <FormTextInput
            placeholder="Voucher Number *"
            onTextChange={this.onVoucherChange}
            pattern={/\S+/}
          />
          <FormTextInput
            placeholder="Cheque Number"
            onTextChange={this.onChequeChange}
            pattern={/.*/}
          />
          <FormTextInput
            placeholder="Any Remarks ?"
            onTextChange={this.onRemarksChange}
            pattern={/.*/}
          />
          <TouchableNativeFeedback
            onPress={() => {
              if (this.formValidate()) {
                const {
                  amount,
                  chequeNumber,
                  voucherNumber,
                  title,
                  date,
                  remarks,
                  category
                } = this.state;
                // add a new Transaction to the list
                this.props.addNewTransaction(
                  createPurchaseTransaction(
                    amount,
                    1,
                    date,
                    remarks,
                    chequeNumber,
                    voucherNumber,
                    category,
                    title
                  )
                );
                // add this category to the CategoryList
                this.props.addNewCategory(category);
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
export default AddPurchaseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBC02D"
  },
  titleStyle: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  elevatedViewStyle: {
    marginVertical: 25,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 15,
    minHeight: 300,
    minWidth: 350
  },
  formTitleStyle: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "600"
  },
  textInputStyle: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 20,
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
    fontSize: 18,
    padding: 8,
    color: "black"
  }
});
