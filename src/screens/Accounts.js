import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  LayoutAnimation,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import ElevatedView from "react-native-elevated-view";

import { currentTabChanged, addNewAccount } from "../actions";
import { getAccountDetails } from "../stateHelpers";
import AccountListItem from "../components/AccountListItem";
import * as names from "../names";

class Accounts extends React.Component {
  state = {
    text: "",
    error: ""
  };

  static navigationOptions = {
    tabBarLabel: "Accounts",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account-balance" size={24} color={tintColor} />
    )
  };

  componentDidMount() {
    // change the currentTab name when the user comes to this tab
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.props.currentTabChanged(names.ACCOUNTS);
    });
  }

  componentDidUpdate() {
    LayoutAnimation.spring();
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  onChangeText = text => {
    if (text.length > 0) {
      this.setState({ error: "" });
    }
    this.setState({ text });
  };

  onPress = () => {
    if (this.state.text.length > 0) {
      // check if the name of new account already exists
      for (let i = 0; i < this.props.accounts.length; i++) {
        if (this.props.accounts[i].accountName === this.state.text) {
          this.setState({
            error: "An account with that name already exists !"
          });
          return;
        }
      }
      this.props.addNewAccount(this.state.text);
      this.setState({ text: "" });
      return;
    }
    this.setState({ error: "Account Name can't be empty" });
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <View>
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <ElevatedView
          elevation={10}
          style={{
            ...styles.formContainer
          }}
        >
          <View style={{ flexDirection: "row", width: 370 }}>
            <TextInput
              style={styles.formInputStyle}
              onChangeText={text => this.onChangeText(text)}
              placeholder="Add Account"
            />
            <TouchableNativeFeedback onPress={this.onPress}>
              <View style={styles.ButtonContainerStyle}>
                <Text style={styles.ButtonTextStyle}>Add</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          {this.renderError()}
          <View style={styles.bannerStyle}>
            <Text style={styles.bannerTextStyle}>
              {this.props.currentAccount
                ? this.props.currentAccount.accountName
                : "Select Current Account"}
            </Text>
          </View>
          <View style={styles.listStyle}>
            <FlatList
              style={{ height: 800 }}
              data={this.props.accounts}
              renderItem={({ item }) => <AccountListItem account={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ElevatedView>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    accounts: getAccountDetails(state),
    currentAccount: state.currentAccount
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    { currentTabChanged, addNewAccount }
  )(Accounts)
);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  formContainer: {
    flexDirection: "column",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  formInputStyle: {
    flex: 1,
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    padding: 5,
    borderColor: "#000",
    borderRadius: 7
  },
  ButtonContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10
  },
  ButtonTextStyle: {
    fontSize: 20,
    color: "green"
  },
  errorStyle: {
    fontSize: 18,
    color: "tomato",
    marginLeft: 20
  },
  bannerStyle: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "tomato",
    elevation: 10,
    backgroundColor: "white",
    padding: 5,
    marginHorizontal: 0,
    alignItems: "center"
  },
  bannerTextStyle: {
    fontSize: 20,
    fontWeight: "600"
  }
});
