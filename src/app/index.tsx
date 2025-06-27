import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import OnboardingCarousel from "../components/globale/Onboarding";
import CustomTextInput from "../components/ui/CustomTextInputLogin";
import PrimaryButton from "../components/ui/PrimaryButton";
import fonts from "../constants/assets/fonts";
import images from "../constants/assets/images";
import { Colors } from "../constants/Colors";
import { setGlobalAppState } from "../store/slice/globalAppState.slice";
import { RootState } from "../store/store";
import { hp } from "../utils/responsive";
const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const globalAppState = useSelector(
    (state: RootState) => state.globalAppState
  );

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
  const onMdpChange = (val) => {
    setMdp(val);
    setMdpError("");
  };

  const onPressLogin = () => {
    router.replace("/(menu)");
  };

    const onPressCreation = () => {
    router.replace("/auth/EmailCreation");
  };

  if (!globalAppState.firstLance) {
    return (
      <OnboardingCarousel
        onFinish={() => {
          dispatch(setGlobalAppState({ ...globalAppState, firstLance: true }));
        }}
      />
    );
  }

  return (
    <View style={[styles.container, { minHeight: hp(100) }]}>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, minHeight: heigth }}>
          <View>
            <View style={styles.headerSection}></View>
            <View style={styles.logoContainer}>
              <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textConnectionContainer}>
              <Text style={styles.titleText}>Se connecter</Text>
            </View>
            <View style={styles.InputSection}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  ref={emailRef}
                  label="Utilisateur"
                  isRequired
                  keyboardType="email-address"
                  value={email}
                  onChange={onEmailChange}
                  error={emailError}
                  clearText={() => onEmailChange("")}
                  placeholder="nom@email.com"
                  autoFocusOnError={!!emailError}
                  icon="account"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.inputContainer}>
                <CustomTextInput
                  ref={mdpRef}
                  label="Mot de passe"
                  isRequired
                  secureTextEntry
                  value={mdp}
                  onChange={onMdpChange}
                  error={mdpError}
                  clearText={() => onMdpChange("")}
                  placeholder="********"
                  autoFocusOnError={!!mdpError}
                  icon="key"
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={styles.checkboxContainerc}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.checkboxContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Checkbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  color={rememberMe ? "#c2026d" : undefined}
                  style={{ transform: [{ scale: 0.75 }], borderRadius: 4 }}
                />
                <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkboxContainer}>
                <Text style={styles.mdpOublie}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomSection}>
              <PrimaryButton
                title="Se connecter"
                color={Colors.button.primary}
                onPress={onPressLogin}
              />
              <PrimaryButton
                title="Créer un compte"
                textColor={Colors.button.primary}
                color={Colors.button.tertiary}
                onPress={onPressCreation}
              />
            </View>
            <View style={styles.versionContainer}>
              {/* <Text style={styles.versionText}>v.1.17</Text> */}
            </View>
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
  headerSection: {
    height: "13.31%",
    // backgroundColor:"red"
  },
  logoContainer: {
    width: "100%",
    height: "18.31%",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  logo: {
    height: "100%",
  },
  textConnectionContainer: {
    width: "100%",
    height: "9.38%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  titleText: {
    fontSize: 24,
    fontFamily: fonts.Poppins.Light,
    color: "#212B37",
    top: 12,
  },
  InputSection: {
    height: "30.78%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  inputContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 6,
    borderColor: "#ccc",
    // borderWidth: 1,
    borderRadius: 5,
    // backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    // backgroundColor: "yellow",
  },
  checkboxContainerc: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "7%",
    height: "8.25%",
    // rowGap:"10%",
    // marginTop: 6,
    // backgroundColor: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // top: 4,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#5F6368",
    fontSize: 17,
    // fontFamily: fonts.Poppins.Light,
  },
  mdpOublie: {
    marginLeft: 8,
    color: "#5F6368",
    fontSize: 17,
    // fontFamily: fonts.Poppins.Light,
  },
  bottomSection: {
    width: "100%",
    height: "12.06%",
    // flexDirection: "row",
    rowGap: 5,
    paddingHorizontal: "8%",
    // backgroundColor: "yellow",
  },
  creerContainer: {
    // backgroundColor:'red',
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  creertext: {
    marginLeft: 8,
    color: "#5F6368",
    fontSize: 17,
    // fontFamily: fonts.Poppins.Light,
  },
  versionContainer: {
    width: "100%",
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  versionText: {
    color: "#75859D",
    fontSize: 16,
    fontFamily: fonts.Montserrat.Regular,
    textAlign: "center",
  },
});

export default Index;
