import React, { Component } from "react";
import { withNavigationFocus } from "react-navigation";

import AddPurchaseForm from "../components/AddPurchaseForm";

class AddPurchaseTab extends Component {
  state = {
    shouldClear: false
  };

  static navigationOptions = {
    tabBarLabel: "Add Purchase",
    tabBarVisible: false
  };

  render() {
    return <AddPurchaseForm />;
  }
}

export default withNavigationFocus(AddPurchaseTab);
