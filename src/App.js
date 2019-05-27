import React from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import * as screens from "./screens";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import reducers from "./reducers";
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
      <Provider
        store={createStore(
          reducers,
          {},
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <View style={{ flex: 1 }}>
          <Header height={60} />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

export default App;
