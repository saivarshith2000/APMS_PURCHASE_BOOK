import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { addNewTransaction, addNewCategory } from "../actions";
import AddPurchaseForm from "../components/AddPurchaseForm";

class AddPurchaseTab extends Component {
  static navigationOptions = {
    tabBarLabel: "Add Purchase",
    tabBarVisible: false
  };

  render() {
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <AddPurchaseForm />
      </KeyboardAwareScrollView>
    );
  }
}

export default AddPurchaseTab;
