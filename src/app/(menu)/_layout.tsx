import fonts from "@/src/constants/assets/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, TextInput } from "react-native";

const TabsLayout = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Pour désactiver le scaling globalement
  if ("defaultProps" in Text) {
    (Text as any).defaultProps ||= {};
    (Text as any).defaultProps.allowFontScaling = false;
  }

  if ("defaultProps" in TextInput) {
    (TextInput as any).defaultProps ||= {};
    (TextInput as any).defaultProps.allowFontScaling = false;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#316094",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.Roboto.condensed,
        },
        tabBarStyle: {
          paddingHorizontal: 10,
        },
      }}
      initialRouteName="index"
    >
      {/* Dashboard */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Tableau",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={20}
              color={focused ? "#316094" : "#999"}
            />
          ),
        }}
      />

      {/* Crédit */}
      <Tabs.Screen
        name="credit"
        options={{
          title: "Crédit",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cash-multiple"
              size={20}
              color={focused ? "#316094" : "#999"}
            />
          ),
        }}
      />

      {/* Compte */}
      <Tabs.Screen
        name="compte"
        options={{
          title: "Compte",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={20}
              color={focused ? "#316094" : "#999"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
