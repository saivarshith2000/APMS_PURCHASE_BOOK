import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { addNewTransaction } from "../actions";
import AddMoneyForm from "../components/AddMoneyForm";

class AddMoneyTab extends Component {
  static navigationOptions = {
    tabBarLabel: "Add Money",
    tabBarVisible: false
  };

  render() {
    return <AddMoneyForm addNewTransaction={this.props.addNewTransaction} />;
  }
}
export default connect(
  null,
  { addNewTransaction }
)(AddMoneyTab);
