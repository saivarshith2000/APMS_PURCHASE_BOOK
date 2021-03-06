import React, { Component } from "react";
import { withNavigationFocus } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <AddPurchaseForm />
      </KeyboardAwareScrollView>
    );
  }
}

export default withNavigationFocus(AddPurchaseTab);
