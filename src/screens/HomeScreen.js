import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import { currentTabChanged, setSelectedItem } from "../actions";
import * as names from "../names";
import TransactionList from "../components/TransactionList";
import { getAllTransactions } from "../stateHelpers";

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
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TransactionList
          transactions={this.props.transactions.filter(transaction => {
            if (this.props.searchTerm) {
              return transaction.title
                .toLowerCase()
                .includes(this.props.searchTerm.toLowerCase());
            }
            return true;
          })}
          navigator={this.props.navigation}
          setSelectedItem={this.props.setSelectedItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: getAllTransactions(state),
    searchTerm: state.searchTerm
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    { currentTabChanged, setSelectedItem }
  )(HomeScreen)
);
