import React from "react";
import { StyleSheet, TouchableNativeFeedback, Text } from "react-native";
import { View } from "react-native-animatable";
import AutoComplete from "react-native-autocomplete-input";
import { TextInput } from "react-native-gesture-handler";

import { connect } from "react-redux";

// this represents a single textInput fiels in the form
// the props contain a list of all current categories

class AutoCompleteInput extends React.Component {
  handleViewRef = ref => (this.view = ref); // this variable holds the animation ref

  state = {
    text: "",
    hasError: false,
    background: "white",
    color: "black",
    categories: this.props.categories
  };
  onPress = text => {
    this.setState({ text });
    this.props.onTextChange(text);
  };

  onTextChange = text => {
    this.setState({ text, resultsHidden: false });
    this.props.onTextChange(text);
  };

  render() {
    return (
      <View
        ref={this.handleViewRef}
        style={styles.container}
        useNativeDriver={true}
      >
        <AutoComplete
          hideResults={!this.state.text}
          data={this.state.categories}
          defaultValue={this.state.text}
          renderTextInput={() => (
            <TextInput
              style={{
                ...styles.textInputStyle,
                color: this.state.color,
                backgroundColor: this.state.background
              }}
              placeholder={this.props.placeholder}
              onChangeText={text => this.onTextChange(text)}
              value={this.state.text}
            />
          )}
          containerStyle={{ borderWidth: 0 }}
          inputContainerStyle={{ borderWidth: 0 }}
          listContainerStyle={styles.listContainerStyle}
          listStyle={null}
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
