import React from "react";
import {
  View,
  LayoutAnimation,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  UIManager,
  Platform
} from "react-native";
import ElevatedView from "react-native-elevated-view";
import { connect } from "react-redux";

import { setSelectedItem } from "../actions";
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
        <Text style={{ flex: 1, fontSize: 18 }}>Rs. {opening}</Text>
        <Text style={{ flex: 1, fontSize: 18 }}>Rs. {closing}</Text>
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
        <Text style={{ fontSize: 18 }}>{remarks}</Text>
      </View>
    </View>
  );
};

class PurchaseListItem extends React.Component {
  state = {
    selected: false
  };

  constructor() {
    super();

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const {
      title,
      voucherNumber,
      chequeNumber,
      opening,
      closing,
      amount,
      dateTime,
      remarks
    } = this.props.purchase;
    return (
      <ElevatedView style={styles.container} elevation={5}>
        <TouchableNativeFeedback
          onPress={() => {
            if (this.state.selected) {
              this.props.setSelectedItem("");
              this.setState({ selected: false });
            } else {
              this.props.setSelectedItem(title);
              this.setState({ selected: true });
            }
          }}
        >
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.dateStyle}>
                <DateBadge dateTime={dateTime} />
              </View>
              <View style={styles.TextContainerStyle}>
                <Text style={styles.amountStyle}>Rs. {amount}</Text>
                <Text style={styles.titleStyle}>{title}</Text>
              </View>
            </View>
            {/* The view Below is visible only when the item is pressed */}
            {this.props.selectedItem === title
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
  { setSelectedItem }
)(PurchaseListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    padding: 5,
    borderRadius: 10,
    borderLeftWidth: 10,
    borderColor: "#FBC02D",
    marginTop: 10,
    minWidth: 390
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
  }
});
