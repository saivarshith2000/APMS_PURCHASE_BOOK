import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  LayoutAnimation
} from "react-native";

class SplashScreen extends React.Component {
  componentDidMount() {
    LayoutAnimation.easeInEaseOut(500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            ...styles.logoStyle,
            width: Dimensions.get("window").width - 100
          }}
        />
        <View style={styles.paragraphStyle}>
          <Text style={styles.HeadingStyle}>Welcome</Text>
          <Text>Fetching Transaction Data...</Text>
        </View>
      </View>
    );
  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoStyle: {
    marginTop: 200,
    flex: 2,
    height: null,
    resizeMode: "contain"
  },
  paragraphStyle: {
    marginTop: 50,
    flex: 6,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-around"
  },
  HeadingStyle: {
    fontSize: 48,
    fontWeight: "600"
  },
  subtitleStyle: {
    fontSize: 18
  }
});
