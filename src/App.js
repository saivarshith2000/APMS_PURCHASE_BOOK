import React from "react";
import { View, Text } from "react-native";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import * as screens from "./screens";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
//create the navigator object
const AppNavigator = createMaterialTopTabNavigator(
  {
    Transactions: screens.HomeScreen,
    New: screens.AddTransaction,
    Accounts: screens.Accounts
  },
  {
    initialRouteName: "Transactions",
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "white",
      inactiveTintColor: "white",
      showIcon: true,
      labelStyle: {
        fontSize: 12,
        fontWeight: "600"
      },

      style: {
        backgroundColor: "#689F38"
      }
    }
  }
);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header height={60}>
          <SearchBox placeholder="Search Transactions ..." />
        </Header>
        <AppContainer />
      </View>
    );
  }
}

export default App;
