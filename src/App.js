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
import { store, persistor } from "./reducers/configureStore";
//create the navigator object
const AppNavigator = createMaterialTopTabNavigator(
  {
    Accounts: screens.Accounts,
    Transactions: screens.HomeScreen,
    New: screens.AddTransaction,
    Data: screens.Data
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
  state = { splashFinished: false };

  componentDidMount() {
    // show the splash for 2 seconds
    setTimeout(() => {
      this.setState({
        splashFinished: true
      });
    }, 3000);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {bootstrapped => {
            if (bootstrapped && this.state.splashFinished) {
              return (
                <View style={{ flex: 1 }}>
                  <Header height={60} />
                  <AppContainer />
                </View>
              );
            } else {
              return <screens.SplashScreen />;
            }
          }}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
