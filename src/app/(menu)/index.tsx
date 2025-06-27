// app/index.tsx
import BalanceCard from "@/src/components/globale/BalanceCard";
import MiniStatementItem from "@/src/components/globale/MiniStatementItem";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";


const data = [
  { id: "1", date: "24/06/2025", destination: "Marché Analakely", amount: -1500 },
  { id: "2", date: "23/06/2025", destination: "Jiro sy rano", amount: -2000 },
  { id: "3", date: "22/06/2025", destination: "Salaire", amount: 5000 },
];

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BalanceCard amount={5000} onTransfer={() => console.log("Transfert")} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MiniStatementItem {...item} />
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
