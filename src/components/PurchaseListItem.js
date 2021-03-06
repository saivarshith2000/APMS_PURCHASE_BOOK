import React from "react";
import {
  View,
  LayoutAnimation,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  UIManager,
  Platform,
  Alert,
  Dimensions
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import { connect } from "react-redux";

import { persistor } from "../reducers/configureStore";
import { setSelectedItem, deleteTransaction } from "../actions";
import DateBadge from "./DateBadge";

/*
Props is purchase object which contains 
 title, voucherNumner, chequeNumber, opening, closing ,amount, dateTime, remarks

*/

renderExtraInfo = ({
  voucherNumber,
  chequeNumber,
  opening,
  closing,
  remarks
}) => {
  return (
    <View style={styles.optionalContainer}>
      <View style={styles.balanceRow}>
        <Text
          style={{ flex: 1, fontSize: 18, color: "green", fontWeight: "500" }}
        >
          Op : Rs. {opening}
        </Text>
        <Text
          style={{ flex: 1, fontSize: 18, color: "tomato", fontWeight: "500" }}
        >
          Cl : Rs. {closing}
        </Text>
      </View>
      <View style={styles.vouchersRow}>
        <Text style={{ flex: 1, fontSize: 16 }}>Voucher: {voucherNumber}</Text>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            borderLeftWidth: 0.5,
            paddingLeft: 5
          }}
        >
          Cheque: {chequeNumber}
        </Text>
      </View>
      <View style={styles.RemarksRow}>
        <Text style={{ fontSize: 18 }}>{remarks ? remarks : "No Remarks"}</Text>
      </View>
    </View>
  );
};

class PurchaseListItem extends React.Component {
  constructor() {
    super();

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring(
      1000,
      (update = { type: "spring", springDamping: 0.8 })
    );
  }

  onLongPress = () => {
    // show a dialog asking if the user wants to delete this transaction
    Alert.alert(
      "Edit/Delete Transaction ?",
      `Editing or Deleting is permanent and can't be undone. Are you sure ?`,
      [
        {
          text: "cancel",
          onPress: () => {}
        },
        {
          text: "Delete",
          onPress: () => {
            // delete this account
            this.props.deleteTransaction(this.props.purchase);
            // immediately persist this state
            persistor.flush();
          }
        }
      ]
    );
  };

  render() {
    const { title, amount, dateTime, id, category } = this.props.purchase;
    return (
      <ElevatedView
        style={{
          ...styles.container,
          width: (Dimensions.get("window").width * 10) / 11
        }}
        elevation={5}
      >
        <TouchableNativeFeedback
          onLongPress={this.onLongPress}
          onPress={() => {
            if (this.props.selectedItem === id) {
              this.props.setSelectedItem("");
              return;
            }
            this.props.setSelectedItem(id);
          }}
        >
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.dateStyle}>
                <DateBadge dateTime={new Date(dateTime)} />
              </View>
              <View style={styles.TextContainerStyle}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.amountStyle}>Rs. {amount}</Text>
                  <View style={styles.dateViewStyle}>
                    <Text style={styles.categoryStyle}>{category}</Text>
                  </View>
                </View>
                <Text style={styles.titleStyle}>{title}</Text>
              </View>
            </View>
            {/* The view Below is visible only when the item is pressed */}
            {this.props.selectedItem === id
              ? renderExtraInfo(this.props.purchase)
              : null}
          </View>
        </TouchableNativeFeedback>
      </ElevatedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedItem: state.selectedItem
  };
};

export default connect(
  mapStateToProps,
  { setSelectedItem, deleteTransaction }
)(PurchaseListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 5,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderColor: "#FBC02D",
    margin: 10
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row"
  },
  dateStyle: {
    borderColor: "gray",
    borderRightWidth: 0.5
  },
  TextContainerStyle: {
    flex: 1,
    flexDirection: "column",
    margin: 10
  },
  titleStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400"
  },
  amountStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    borderBottomWidth: 0.5,
    marginTop: 0,
    paddingBottom: 5,
    borderColor: "gray"
  },
  RemarksRow: {
    borderTopWidth: 0.5,
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5
  },
  optionalContainer: {
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: "column"
  },
  balanceRow: {
    borderTopWidth: 0.5,
    flex: 1,
    padding: 5,
    flexDirection: "row"
  },
  vouchersRow: {
    borderTopWidth: 0.5,
    padding: 5,
    flex: 1,
    flexDirection: "row"
  },
  categoryStyle: {
    color: "black",
    fontSize: 14
  },
  dateViewStyle: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    padding: 5,
    margin: 0
  }
});
