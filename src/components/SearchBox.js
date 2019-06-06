import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { connect } from "react-redux";
import { setSearchTerm } from "../actions";

class SearchBox extends Component {
  state = {
    text: ""
  };

  onTextChange = text => {
    this.setState({ text });
    this.props.setSearchTerm(text);
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
          multiline={false}
        />
      </View>
    );
  }
}

export default connect(
  null,
  { setSearchTerm }
)(SearchBox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#8BC34A",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 5
  },
  iconStyle: {
    flex: 1,
    marginLeft: 15,
    marginRight: 0,
    padding: 5
  },
  textInputStyle: {
    flex: 14,
    height: 40,
    fontSize: 18,
    margin: 5
  }
});
