import React from "react";
import { StyleSheet, TouchableNativeFeedback, Text } from "react-native";
import { View } from "react-native-animatable";
import AutoComplete from "react-native-autocomplete-input";
import { TextInput } from "react-native-gesture-handler";

import { connect } from "react-redux";

// this represents a single textInput fiels in the form
// the props contain a list of all current categories

class AutoCompleteInput extends React.Component {
  state = {
    text: "",
    hideResults: true
  };
  onPress = text => {
    this.setState({ text });
    this.setState({ hideResults: true });
    this.props.onTextChange(text);
  };

  onTextChange = text => {
    this.setState({ text });
    // if the list is hidden and text is entered, show the list
    if (this.state.hideResults && text.length > 0) {
      this.setState({ hideResults: false });
    }
    this.props.onTextChange(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <AutoComplete
          hideResults={this.state.hideResults}
          data={this.props.categories}
          defaultValue={this.state.text}
          keyExtractor={({ item }) => item}
          renderTextInput={() => (
            <TextInput
              style={styles.textInputStyle}
              placeholder={this.props.placeholder}
              onChangeText={text => this.onTextChange(text)}
              value={this.state.text}
            />
          )}
          containerStyle={{ borderWidth: 0 }}
          inputContainerStyle={{ borderWidth: 0 }}
          listContainerStyle={styles.listContainerStyle}
          listStyle={{ borderWidth: 0 }}
          renderItem={({ item }) => {
            if (
              item.includes(this.state.text.toUpperCase()) &&
              this.state.text
            ) {
              return (
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => {
                    this.onPress(item);
                  }}
                >
                  <Text style={styles.listItemStyle}>{item}</Text>
                </TouchableNativeFeedback>
              );
            } else {
              return null;
            }
          }}
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

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(AutoCompleteInput);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginTop: 10
  },
  textInputStyle: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7,
    backgroundColor: "white",
    color: "black"
  },
  listContainerStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    padding: 0
  },
  listItemStyle: {
    borderWidth: 0,
    borderColor: "white",
    fontSize: 18,
    padding: 5
  }
});
