import TopHeader from "@/src/components/globale/TopHeader";
import CustomTextInput from "@/src/components/ui/CustomTextInputLogin";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { Colors } from "@/src/constants/Colors";
import { hp } from "@/src/utils/responsive";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

const MdpCreation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const emailRef = useRef(null);
  const mdpRef = useRef(null);
  const { heigth, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mdpError, setMdpError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onEmailChange = (val) => {
    setEmail(val);
    setEmailError("");
  };
  const onPressRetour = () => {
    router.replace("/auth/EmailCreation");
  };

  return (
    <View style={[styles.container, { minHeight: hp(100) }]}>
      <TopHeader title="Création compte" retourPress={onPressRetour} />
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={60}
        scrollEventThrottle={16}
      >
        <View style={{ flex: 1, minHeight: heigth }}>
          <View style={styles.InputSection}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={emailRef}
                label="Nouveau mot de passe"
                isRequired
                secureTextEntry
                value={email}
                onChange={onEmailChange}
                error={emailError}
                clearText={() => onEmailChange("")}
                placeholder="nouveau mot de passe"
                autoFocusOnError={!!emailError}
                icon="key"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={emailRef}
                label="Confirmation mot de passe"
                isRequired
                secureTextEntry
                value={email}
                onChange={onEmailChange}
                error={emailError}
                clearText={() => onEmailChange("")}
                placeholder="confirmation mot de passe"
                autoFocusOnError={!!emailError}
                icon="key"
                returnKeyType="done"
              />
            </View>
          </View>
          <View style={styles.bottomSection}>
            <PrimaryButton
              title="Annuler"
              textColor={Colors.button.primary}
              color={Colors.button.tertiary}
              onPress={onPressRetour}
            />
            <PrimaryButton
              title="Suivant"
              color={Colors.button.primary}
              onPress=""
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  InputSection: {
    height: "78%",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "yellow",
    paddingTop: "5%",
  },
  bottomSection: {
    width: "100%",
    height: "15%",
    // flexDirection: "row",
    rowGap: 5,
    paddingHorizontal: "8%",
    // backgroundColor: "red",
  },
  inputContainer: {
    width: "90%",
    // alignSelf: "center",
    marginVertical: 6,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

export default MdpCreation;
