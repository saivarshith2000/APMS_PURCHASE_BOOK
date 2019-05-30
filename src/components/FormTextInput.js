import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { View } from "react-native-animatable";

// this represents a single textInput fiels in the form

class FormTextInput extends React.Component {
  handleViewRef = ref => (this.view = ref); // this variable holds the animation ref

  state = {
    text: "",
    hasError: false,
    background: "white",
    color: "black"
  };

  handleTextChange = text => {
    if (text.search(this.props.pattern)) {
      // if there is an error
      this.setState({
        text,
        color: "white",
        background: "#f26877",
        hasError: true
      });
      this.view.bounce(700);
    } else {
      this.setState({
        text,
        color: "black",
        background: "white",
        hasError: false
      });
      this.props.onTextChange(text);
    }
  };

  render() {
    return (
      <View
        ref={this.handleViewRef}
        style={styles.container}
        useNativeDriver={true}
      >
        <TextInput
          style={{
            ...styles.textInputStyle,
            color: this.state.color,
            backgroundColor: this.state.background
          }}
          placeholder={this.props.placeholder}
          onChangeText={text => this.handleTextChange(text)}
          value={this.state.value}
        />
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
    marginVertical: 20,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7
  }
});
