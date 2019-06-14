import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  ToastAndroid
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { createPurchaseTransaction } from "../createTransaction";
import { addNewTransaction, addNewCategory } from "../actions";
import { getAllVoucherNumbers } from "../stateHelpers";
import MoneyInput from "./MoneyInput";
import DateInput from "./DateInput";
import FormTextInput from "./FormTextInput";
import AutoCompleteInput from "./AutoCompleteInput";

const initialState = {
  title: "",
  amount: "",
  remarks: "",
  date: null,
  dateText: "",
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

  setDate = (date, dateText) => {
    this.setState({ date, dateText });
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
    if (this.props.vouchers.includes(voucherNumber)) {
      // if voucher number already exists
      retVal = false;
      this.setState({ voucherNumberError: "Voucher number already exists " });
    } else {
      this.setState({ voucherNumberError: "" });
    }
    return retVal;
  };

  render() {
    const { height, width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <ElevatedView
          elevation={10}
          style={{
            ...styles.elevatedViewStyle,
            minHeight: (height * 2) / 3,
            width: (width * 8) / 9
          }}
        >
          <View style={styles.titleStyle}>
            <Text style={styles.formTitleStyle}>Add New Purchase</Text>
            <Icon
              name="ios-refresh"
              size={24}
              style={{ marginLeft: "auto", marginRight: 10 }}
              onPress={() => {
                this.resetForm();
              }}
            />
          </View>
          <FormTextInput
            placeholder="Title *"
            onTextChange={this.onTitleChange}
            error={this.state.titleError}
            value={this.state.title}
          />
          <MoneyInput
            setAmount={this.setAmount}
            error={this.state.amountError}
            amount={this.state.amount}
          />
          <DateInput setDate={this.setDate} dateText={this.state.dateText} />

          <AutoCompleteInput
            placeholder="Select Category *"
            onTextChange={this.onCategoryChange}
            error={this.state.categoryError}
            text={this.state.category}
          />
          <FormTextInput
            placeholder="Voucher Number *"
            onTextChange={this.onVoucherChange}
            error={this.state.voucherNumberError}
            value={this.state.voucherNumber}
          />
          <FormTextInput
            placeholder="Cheque Number"
            onTextChange={this.onChequeChange}
            value={this.state.chequeNumber}
          />
          <FormTextInput
            placeholder="Any Remarks ?"
            onTextChange={this.onRemarksChange}
            value={this.state.remarks}
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
                    this.props.currentAccount.id,
                    date ? date : new Date(),
                    remarks,
                    chequeNumber,
                    voucherNumber,
                    category,
                    title,
                    this.props.currentAccount.balance
                  )
                );
                // add this category to the CategoryList
                this.props.addNewCategory(category);
                ToastAndroid.show(
                  "Added purchase successfully !",
                  ToastAndroid.SHORT
                );
                this.resetForm();
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

const mapStateToProps = state => {
  return {
    currentAccount: state.currentAccount,
    vouchers: getAllVoucherNumbers(state)
  };
};

export default connect(
  mapStateToProps,
  { addNewCategory, addNewTransaction }
)(AddPurchaseForm);

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
