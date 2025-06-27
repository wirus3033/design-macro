import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { useDispatch } from "react-redux";

const Notification = () => {
  const dispatch = useDispatch();
  const router = useRouter();



  return (
    <View style={styles.container}>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
});

export default Notification;
