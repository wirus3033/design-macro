import PrimaryButton from "@/src/components/ui/PrimaryButton";
import images from "@/src/constants/assets/images";
import { Colors } from "@/src/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const router = useRouter();

const menuOptions = [
  { id: "1", label: "Modifier profil", icon: "edit", link: "/screen/compte/ChangeProfil" },
  { id: "2", label: "Changer mot de passe", icon: "lock",link: "/screen/compte/ChangeMotDePasse" },
  { id: "3", label: "Changer code PIN", icon: "vpn-key" ,link: "/screen/compte/ChangeCodePin"},
  { id: "4", label: "Notification", icon: "notifications-none" ,link: "/screen/compte/Notification"},
  { id: "5", label: "Confidentialité", icon: "privacy-tip",link: "/screen/compte/ChangeProfil" },
  { id: "6", label: "Langue de l'application", icon: "language",link: "/screen/compte/ChangeProfil" },
];

const Compte = () => {
  const handleOptionPress = (link?: string) => {
    if (link) {
      router.replace(link);
    }else{
      console.log("aucinnnnnn")
    }
  };

  const onPressLogin = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* === HEADER === */}
        <View style={styles.header}>
          <Image source={images.paysage} style={styles.headerBackground} />
          <View style={styles.profileImageWrapper}>
            <Image source={images.revenu} style={styles.profileImage} />
          </View>
        </View>

        {/* === INFOS UTILISATEUR === */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>ANDRIAMITONDRA Fredson</Text>
          <Text style={styles.info}>fredson@email.com</Text>
          <Text style={styles.info}>+261 34 12 345 67</Text>
        </View>

        {/* === MENU === */}
        <FlatList
          data={menuOptions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.menuContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleOptionPress(item.link)}
              activeOpacity={0.7}
            >
              <MaterialIcons name={item.icon} size={22} color="#316094" />
              <Text style={styles.menuText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
              {index < menuOptions.length - 1 && (
                <View style={styles.divider} />
              )}
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* === DECONNEXION === */}
      <View style={styles.logoutContainer}>
        <PrimaryButton
          title="Se déconnecter"
          color={Colors.button.primary}
          onPress={onPressLogin}
        />
      </View>
    </SafeAreaView>
  );
};

export default Compte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    height: 180,
    position: "relative",
  },
  headerBackground: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageWrapper: {
    position: "absolute",
    bottom: -50,
    left: width / 2 - 50,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    marginTop: 60,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212B37",
  },
  info: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  menuContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    elevation: 1,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#212B37",
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: "10%",
    right: "10%",
    height: 1,
    backgroundColor: "#eee",
  },
  logoutContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
