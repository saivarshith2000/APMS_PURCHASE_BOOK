import React from "react";
import { StyleSheet, Text } from "react-native";
import ElevatedView from "react-native-elevated-view";
import { connect } from "react-redux";

import * as names from "../names";
import SearchBox from "./SearchBox";
// The Header component and the currentTab are not directly connected
// The header is informed its context from the currentTab state from redux
// The header then renders appropriate view based on the currentTab
// On the home screen it renders the searchBar with sort and filter buttons
// on other screens, it just displays appropriate static content

class Header extends React.Component {
  // Helper render functions
  renderHeader = () => {
    switch (this.props.currentTab) {
      case names.HOME: {
        return <SearchBox placeholder="Search Transactions ..." />;
      }
      case names.ACCOUNTS: {
        return <Text style={styles.TextHeaderStyle}>Accounts</Text>;
      }
      case names.NEW: {
        return <Text style={styles.TextHeaderStyle}>New Transaction</Text>;
      }
      default:
        return <Text>This is the default header, you shouldn't see this</Text>;
    }
  };

  render() {
    return (
      <ElevatedView elevation={10} style={styles.container}>
        {this.renderHeader()}
      </ElevatedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.currentTab
  };
};

export default connect(mapStateToProps)(Header);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 60
  },
  TextHeaderStyle: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    padding: 0,
    color: "black",
    fontFamily: "sans-serif-light"
  }
});
