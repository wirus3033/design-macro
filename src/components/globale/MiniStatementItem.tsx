import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  date: string;
  destination: string;
  amount: number;
};

const MiniStatementItem = ({ date, destination, amount }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date}</Text>
        <Text>{destination}</Text>
      </View>
      <Text style={styles.amount}>{amount.toFixed(2)} Ar</Text>
    </View>
  );
};

export default MiniStatementItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  amount: {
    fontWeight: "bold",
  },
});
