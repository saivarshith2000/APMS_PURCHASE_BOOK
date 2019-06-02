import React from "react";
import {
  TextInput,
  Text,
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager
} from "react-native";
import { View } from "react-native-animatable";

// this represents a single textInput fiels in the form

class FormTextInput extends React.Component {
  state = {
    text: "",
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
    LayoutAnimation.spring(
      1000,
      (update = { type: "spring", springDamping: 0.8 })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            ...styles.textInputStyle,
            color: this.state.color,
            backgroundColor: this.state.background
          }}
          placeholder={this.props.placeholder}
          onChangeText={text => {
            this.props.onTextChange(text);
            this.setState({ text });
          }}
          value={this.state.value}
        />
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
      </View>
    );
  }
}
export default FormTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5
  },
  textInputStyle: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7
  }
});
