import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableNativeFeedback,
  ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

import * as names from "../names";
import { writeExcelFile } from "../ExcelHelper";
import { createBackup, restoreBackup } from "../BackupHelper";
import {
  getAccountDetails,
  getAllTransactions,
  convertToJson
} from "../stateHelpers";
import { currentTabChanged, restoreData } from "../actions";

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

  showAlert = text => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

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

  onGenPress = () => {
    if (this.state.hasPermission) {
      const { transactions, accounts } = this.props;
      writeExcelFile(accounts, transactions);
    } else {
      this.getPerms();
    }
  };

  onBackupPress = () => {
    if (this.state.hasPermission) {
      const status = createBackup(this.props.backupData);
      if (status) {
        this.showAlert("Backup successful !");
        return;
      }
      this.showAlert("Failed to backup data !!!");
    } else {
      this.getPerms();
    }
  };

  onRestorePress = () => {
    if (this.state.hasPermission) {
      const restoreStatus = restoreBackup();
      if (restoreStatus === null) {
        this.showAlert("No restore file found !!!");
      } else {
        this.props.backupData(restoreStatus);
      }
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
          <TouchableNativeFeedback onPress={this.onGenPress}>
            <View>
              <Text style={styles.buttonTextStyle}>Generate Data</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableNativeFeedback onPress={this.onBackupPress}>
            <View>
              <Text style={styles.buttonTextStyle}>Backup Data</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableNativeFeedback onPress={this.onRestorePress}>
            <View>
              <Text style={styles.buttonTextStyle}>Restore Data</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    accounts: getAccountDetails(state),
    transactions: getAllTransactions(state),
    backupData: convertToJson(state)
  };
};

export default connect(
  mapStateToProps,
  { currentTabChanged, restoreData }
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
