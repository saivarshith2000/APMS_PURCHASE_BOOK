import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";

import * as screens from "./screens";
import Header from "./components/Header";
import configureStore from "./reducers/configureStore";
//create the navigator object
const AppNavigator = createMaterialTopTabNavigator(
  {
    Accounts: screens.Accounts,
    Transactions: screens.HomeScreen,
    New: screens.AddTransaction
  },
  {
    initialRouteName: "Accounts",
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
        backgroundColor: "#00796B"
      }
    }
  }
);
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    const { store, persistor } = configureStore();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
            <Header height={60} />
            <AppContainer />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
