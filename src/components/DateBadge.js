import React from "react";
import { View, Text, StyleSheet } from "react-native";

// This component displays a date badge
// it takes a standard Date() object as the only prop

const getWeekDay = weekDay => {
  switch (weekDay) {
    case 0: {
      return "Sun";
    }
    case 1: {
      return "Mon";
    }
    case 2: {
      return "Tue";
    }
    case 3: {
      return "Wed";
    }
    case 4: {
      return "Thur";
    }
    case 5: {
      return "Fri";
    }
    case 6: {
      return "Sat";
    }
    default:
      return "lol";
  }
};

const DateBadge = props => {
  let day = props.dateTime.getDate().toString();
  day = day.length === 2 ? day : `0${day}`;
  const month = 1 + props.dateTime.getMonth();
  const year = props.dateTime.getFullYear().toString();
  const weekDay = getWeekDay(props.dateTime.getDay());

  return (
    <View style={styles.container}>
      <View style={styles.RowOne}>
        <Text style={styles.weekDayStyle}>{day}</Text>
        <Text style={styles.dateStyle}>{weekDay}</Text>
      </View>
      <View style={styles.RowTwo}>
        <Text style={styles.monthStyle}>{month}</Text>
        <Text style={styles.yearStyle}>{year}</Text>
      </View>
    </View>
  );
};
export default DateBadge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  RowOne: {
    flexDirection: "row"
  },
  RowTwo: {
    flexDirection: "row"
  },
  weekDayStyle: {
    fontSize: 24,
    fontWeight: "800",
    marginHorizontal: 10
  },
  dateStyle: {
    fontSize: 18,
    marginRight: 10,
    marginVertical: 5
  },
  monthStyle: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 2
  },
  yearStyle: {
    fontSize: 20,
    marginRight: 8,
    marginVertical: 2
  }
});
