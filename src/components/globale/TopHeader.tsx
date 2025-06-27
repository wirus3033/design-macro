import fonts from "@/src/constants/assets/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  retourPress?: () => void;
  title:string;
}

const TopHeader = ({ retourPress,title }: Props) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={retourPress} style={styles.side}>
        <MaterialCommunityIcons name="arrow-left" size={26} />
      </TouchableOpacity>


      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity
        style={[styles.menuButton, { alignItems: "flex-end" }]}
      ></TouchableOpacity>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 12,
    elevation: 5,
    borderBottomWidth: 0.3,
    borderColor: "#ddd",
    height: "7.81%",
  },
  home: {
    height: "55.00%",
    width: 40,
    resizeMode: "contain",

  },
  side: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",

  },
  menuButton: {
    flex: 1,
    alignItems: "flex-start",

  },

  title:{
    fontFamily:fonts.Roboto.condensed,
    fontSize:16,
    textAlign:"center",
  }
});
