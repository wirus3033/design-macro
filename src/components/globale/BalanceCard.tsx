import { Colors } from "@/src/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  amount: number;
  onTransfer: () => void;
};

const BalanceCard = ({ amount, onTransfer }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>soldes</Text>
      <Text style={styles.amount}>{amount.toFixed(2)} Ar</Text>
      <TouchableOpacity style={styles.button} onPress={onTransfer}>
        <Text style={styles.buttonText}>transferer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.button.primary,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 24,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#007aff",
    fontWeight: "bold",
  },
});
