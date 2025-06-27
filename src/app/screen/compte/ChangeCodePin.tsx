import TopHeader from "@/src/components/globale/TopHeader";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { useDispatch } from "react-redux";

const ChangeCodePin = () => {
  const dispatch = useDispatch();
  const router = useRouter();



  return (
    <View style={styles.container}>
      <TopHeader title="Changer code Pin"/>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
});

export default ChangeCodePin;
