import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";

// this component displays a calendar icon with text input beside.
// if the user selects a date by clicking the icon, it will set the date to the input
// date is stored in the date

class DateInput extends Component {
  state = {
    date: null,
    isPickerVisible: false,
    dateText: ""
  };

  extractDate = date => {
    // the date from the picker is in : "Tue May 28 2019 15:57:00 GMT+0530" format
    // the date we need to set the textInput is in 28-05-2019
    var dateObj = new Date(date);
    var day = dateObj.getDate();
    var month = 1 + dateObj.getMonth(); // since index starts from 0
    var year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  showPicker = () => {
    this.setState({ isPickerVisible: true });
  };

  hidePicker = () => {
    this.setState({ isPickerVisible: false });
  };

  onDatePick = date => {
    this.setState({
      date: date,
      dateText: this.extractDate(date),
      isPickerVisible: false
    });
    this.props.setDate(date);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            this.showPicker();
          }}
        >
          <Icon name="calendar" size={32} style={{ paddingHorizontal: 5 }} />
          <DateTimePicker
            isVisible={this.state.isPickerVisible}
            onCancel={this.hidePicker}
            onConfirm={this.onDatePick}
          />
        </TouchableNativeFeedback>
        <TextInput
          style={styles.textInputStyle}
          multiline={false}
          editable={false}
          placeholder="Select Date"
          keyboardType={"numbers-and-punctuation"}
          value={this.state.dateText}
        />
      </View>
    );
  }
}
export default DateInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20
  },
  textInputStyle: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 15,
    marginVertical: 15,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    color: "gray"
  }
});
