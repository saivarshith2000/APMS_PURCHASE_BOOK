import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  UIManager,
  Platform,
  LayoutAnimation
} from "react-native";
import { View } from "react-native-animatable";

// this input field has validation
// if the entered input is contains alphabets at any point it will show error

class MoneyInput extends Component {
  handleViewRef = ref => (this.view = ref); // this variable holds the animation ref

  state = {
    amount: "",
    hasError: false,
    background: "white",
    color: "black"
  };

  constructor() {
    super();

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  onAmountChange = amount => {
    if (amount.search(/^[0-9]\d{0,9}(\.\d{1,3})?%?$/)) {
      this.setState({
        hasError: true,
        amount,
        background: "#f26877",
        color: "white"
      });
      this.view.rubberBand(700);
    } else {
      this.setState({
        hasError: false,
        amount,
        background: "white",
        color: "black"
      });
      this.props.setAmount(amount);
    }
  };

  renderError() {
    if (this.props.error) {
      return (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#f46542",
            alignSelf: "center",
            padding: 0,
            margin: 0
          }}
        >
          {this.props.error}
        </Text>
      );
    }
    return null;
  }

  render() {
    console.log(this.props.error);
    return (
      <View style={{ flexDirection: "column" }}>
        <View
          ref={this.handleViewRef}
          style={styles.container}
          useNativeDriver={true}
        >
          <Text
            style={{
              fontSize: 24,
              color: "black"
            }}
          >
            Rs.{" "}
          </Text>
          <TextInput
            style={{
              ...styles.textInputStyle,
              backgroundColor: this.state.background,
              color: this.state.color
            }}
            multiline={false}
            placeholder={`Enter Amount in ${"\u20B9"}`}
            keyboardType={"number-pad"}
            onChangeText={amount => this.onAmountChange(amount)}
            value={this.state.amount}
          />
        </View>
        {this.renderError()}
      </View>
    );
  }
}
export default MoneyInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20
  },
  textInputStyle: {
    flex: 1,
    fontSize: 18,
    marginVertical: 15,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7
  }
});
