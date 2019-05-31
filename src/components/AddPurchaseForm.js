import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import ElevatedView from "react-native-elevated-view";
import Icon from "react-native-vector-icons/Ionicons";

import { createPurchaseTransaction } from "../createTransaction";
import MoneyInput from "./MoneyInput";
import DateInput from "./DateInput";
import FormTextInput from "./FormTextInput";
import AutoCompleteInput from "./AutoCompleteInput";

const initialState = {
  title: "",
  amount: "",
  remarks: "",
  date: new Date(),
  voucherNumber: "",
  chequeNumber: "",
  category: "",
  // formValidation Props
  titleError: "",
  amountError: "",
  voucherNumberError: "",
  categoryError: ""
};

class AddPurchaseForm extends Component {
  state = initialState;

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

  resetForm = () => {
    this.setState(initialState);
  };

  formValidate = () => {
    const { title, category, voucherNumber, amount } = this.state;
    let retVal = true;
    if (title.length === 0) {
      this.setState({ titleError: "Title can't be empty !!!" });
      retVal = false;
    } else {
      this.setState({ titleError: "" });
    }
    if (amount.length === 0 || isNaN(amount)) {
      this.setState({ amountError: "Amount must be a number !!!" });
      retVal = false;
    } else {
      this.setState({ amountError: "" });
    }
    if (category.length === 0) {
      this.setState({ categoryError: "Please select a category !!!" });
      retVal = false;
    } else {
      this.setState({ categoryError: "" });
    }
    if (voucherNumber.length === 0) {
      retVal = false;
      this.setState({ voucherNumberError: "Voucher number can't be empty" });
    } else {
      this.setState({ voucherNumberError: "" });
    }
    return retVal;
  };

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={10} style={styles.elevatedViewStyle}>
          <View style={styles.titleStyle}>
            <Text style={styles.formTitleStyle}>Add New Purchase</Text>
            <Icon
              name="ios-refresh"
              size={24}
              style={{ marginLeft: "auto", marginRight: 10 }}
              onPress={this.resetForm}
            />
          </View>
          <FormTextInput
            placeholder="Title *"
            onTextChange={this.onTitleChange}
            error={this.state.titleError}
          />
          <MoneyInput
            setAmount={this.setAmount}
            error={this.state.amountError}
          />
          <DateInput setDate={this.setDate} />
          <AutoCompleteInput
            placeholder="Select Category *"
            onTextChange={this.onCategoryChange}
            error={this.state.categoryError}
          />
          <FormTextInput
            placeholder="Voucher Number *"
            onTextChange={this.onVoucherChange}
            error={this.state.voucherNumberError}
          />
          <FormTextInput
            placeholder="Cheque Number"
            onTextChange={this.onChequeChange}
          />
          <FormTextInput
            placeholder="Any Remarks ?"
            onTextChange={this.onRemarksChange}
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
    alignItems: "center",
    flexDirection: "row"
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
    fontWeight: "600",
    marginLeft: "auto"
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
