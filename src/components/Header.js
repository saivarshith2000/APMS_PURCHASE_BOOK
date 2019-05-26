import React from "react";
import { View, StyleSheet } from "react-native";
import ElevatedView from "react-native-elevated-view";

const Header = props => {
  return (
    <ElevatedView
      elevation={10}
      style={
        props.height
          ? { ...styles.container, height: props.height }
          : styles.container
      }
    >
      {props.children}
    </ElevatedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50
  }
});
