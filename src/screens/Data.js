import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import * as names from "../names";
import { writeExcelFile } from "../ExcelHelper";
import { getAccountDetails, getAllTransactions } from "../stateHelpers";
import { currentTabChanged } from "../actions";

class Data extends Component {
  static navigationOptions = {
    tabBarLabel: "Transactions",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="file-excel-o" size={24} color={tintColor} />
    )
  };

  state = {
    hasPermission: false
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.props.currentTabChanged(names.DATA);
    });
    // complete the database operation and get the data for the list
    // for temp purposes, we are pulling data from a dummy file
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  getPerms = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Your Save flow
          this.setState({ hasPermission: true });
          const { transactions, accounts } = this.props;
          writeExcelFile(accounts, transactions);
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  onPress = () => {
    if (this.state.hasPermission) {
      const { transactions, accounts } = this.props;
      writeExcelFile(accounts, transactions);
    } else {
      this.getPerms();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoStyle}>
          <Text style={styles.infoTextStyle}>
            Data generated is stored in APMS PURCHASES Folder in Downloads
          </Text>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableNativeFeedback onPress={this.onPress}>
            <Text style={styles.buttonTextStyle}>Generate Data</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: getAccountDetails(state),
    transactions: getAllTransactions(state)
  };
};

export default connect(
  mapStateToProps,
  { currentTabChanged }
)(Data);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoStyle: {
    padding: 5,
    margin: 20
  },
  infoTextStyle: {
    fontSize: 16
  },
  buttonStyle: {
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "white",
    elevation: 10,
    margin: 20
  },
  buttonTextStyle: {
    fontSize: 32,
    color: "green",
    margin: 20
  }
});
