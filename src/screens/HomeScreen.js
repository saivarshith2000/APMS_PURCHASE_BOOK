import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { currentTabChanged, getDataFromDB, setSelectedItem } from "../actions";
import * as names from "../names";
import TransactionList from "../components/TransactionList";

class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Transactions",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-list" size={24} color={tintColor} />
    )
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.props.currentTabChanged(names.HOME);
      // get the data from the database
      if (!this.props.transactions.dataObtained) {
        this.props.getDataFromDB();
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TransactionList
          list={this.props.transactions.list}
          navigator={this.props.navigation}
          setSelectedItem={this.props.setSelectedItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    { currentTabChanged, getDataFromDB, setSelectedItem }
  )(HomeScreen)
);
