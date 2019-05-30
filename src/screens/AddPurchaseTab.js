import React, { Component } from "react";
import { connect } from "react-redux";
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
        <AddPurchaseForm
          addNewTransaction={this.props.addNewTransaction}
          addNewCategory={this.props.addNewCategory}
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  null,
  { addNewTransaction, addNewCategory }
)(AddPurchaseTab);
