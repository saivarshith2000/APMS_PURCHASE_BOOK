import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class SearchBox extends Component {
  state = {
    text: ""
  };

  onTextChange = text => {
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="ios-search"
          size={24}
          color="gray"
          style={styles.iconStyle}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder={this.props.placeholder}
          onChangeText={text => this.onTextChange(text)}
          value={this.state.text}
        />
      </View>
    );
  }
}
export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8BC34A",
    borderWidth: 2,
    borderRadius: 15,
    margin: 10
  },
  iconStyle: {
    flex: 1,
    marginLeft: 15,
    marginRight: 0
  },
  textInputStyle: {
    flex: 12,
    height: 40,
    fontSize: 18,
    marginHorizontal: 0,
    padding: 0
  }
});
