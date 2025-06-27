import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import OnboardingCarousel from "../components/globale/Onboarding";
import CustomTextInput from "../components/ui/CustomTextInputLogin";
import PrimaryButton from "../components/ui/PrimaryButton";
import fonts from "../constants/assets/fonts";
import images from "../constants/assets/images";
import { Colors } from "../constants/Colors";
import { setGlobalAppState } from "../store/slice/globalAppState.slice";
import { RootState } from "../store/store";

const { width } = Dimensions.get("window");

const Index = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const globalAppState = useSelector(
        (state: RootState) => state.globalAppState
    );
    const insets = useSafeAreaInsets();

    const emailRef = useRef(null);
    const mdpRef = useRef(null);

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
        <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right", "top"]}>
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    enableOnAndroid
                    enableAutomaticScroll
                    contentContainerStyle={styles.scrollContent}
                    extraScrollHeight={Platform.OS === "ios" ? 60 : 80}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.headerSection}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={images.logo}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.titleText}>Se connecter</Text>
                    </View>

                    <View style={styles.InputSection}>
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

                    <View style={styles.checkboxRow}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                            activeOpacity={0.7}
                        >
                            <Checkbox
                                value={rememberMe}
                                onValueChange={setRememberMe}
                                color={rememberMe ? "#c2026d" : undefined}
                                style={{ transform: [{ scale: 0.75 }], borderRadius: 4 }}
                            />
                            <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.mdpOublie}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.bottomSection, { marginBottom: insets.bottom + 10 }]}>
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
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    headerSection: {
        alignItems: "center",
        marginBottom: 16,
    },
    logoContainer: {
        width: width * 0.32, // ~120px for std phones, scales for tablets
        height: width * 0.32,
        marginBottom: 10,
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    titleText: {
        fontSize: Math.min(width * 0.06, 28),
        fontFamily: fonts.Poppins.Light,
        color: "#212B37",
        marginTop: 12,
        marginBottom: 12,
    },
    InputSection: {
        width: "100%",
        marginBottom: 16,
        gap: 10,
    },
    checkboxRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: 8,
        color: "#5F6368",
        fontSize: 16,
    },
    mdpOublie: {
        color: "#c2026d",
        fontSize: 16,
    },
    bottomSection: {
        width: "100%",
        gap: 10,
        marginTop: 15,
        // backgroundColor:"red"
        // L’espace bas se règle avec insets.bottom via JS
    },
    versionContainer: {
        alignItems: "center",
        marginTop: 8,
    },
    versionText: {
        color: "#75859D",
        fontSize: 16,
        fontFamily: fonts.Montserrat.Regular,
        textAlign: "center",
    },
});

export default Index;



// import Checkbox from "expo-checkbox";
// import { useRouter } from "expo-router";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useDispatch } from "react-redux";
// // Components
// // import CustomLoading from "@/src/components/globale/CustomLoading";

// import fonts from "@/src/constants/assets/fonts";






// import CustomTextInput, { CustomTextInputRef } from "../components/ui/CustomTextInputLogin";
// import PrimaryButton from "../components/ui/PrimaryButton";
// import images from "../constants/assets/images";
// import { Colors } from "../constants/Colors";
// import { wp } from "../utils/responsive";

// // Types
// interface LoginForm {
//     email: string;
//     password: string;
//     rememberMe: boolean;
// }

// interface FormErrors {
//     email: string;
//     password: string;
//     general: string;
// }

// // Validation utilities
// const validatePassword = (password: string) => {
//     if (!password.trim()) {
//         return { isValid: false, error: "Veuillez saisir votre mot de passe" };
//     }
//     return { isValid: true, error: "" };
// };

// const Index = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();

//     // Refs
//     const emailRef = useRef<CustomTextInputRef>(null);
//     const passwordRef = useRef<CustomTextInputRef>(null);
//     const [rememberMe, setRememberMe] = useState(false);
//     // Form state
//     const [form, setForm] = useState<LoginForm>({
//         email: "",
//         password: "",
//         rememberMe: false,
//     });

//     const [errors, setErrors] = useState<FormErrors>({
//         email: "",
//         password: "",
//         general: "",
//     });

//     // UI state
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     // Computed values
//     const isFormValid =
//         form.email.trim() &&
//         form.password.trim() &&
//         !errors.email &&
//         !errors.password;

//     //   Information user localement
//     //   const usersLocal = useSelector((state: RootState) => state.auth.users);

//     // Load saved credentials on mount
//     useEffect(() => {
//         const loadSavedCredentials = async () => {
//             //   try {
//             //     const [savedEmail, savedPassword] = await Promise.all([
//             //       getData(Local_Storage.email),
//             //       getData(Local_Storage.password),
//             //     ]);

//             //     if (savedEmail || savedPassword) {
//             //       setForm({
//             //         email: savedEmail || "",
//             //         password: savedPassword || "",
//             //         rememberMe: !!savedEmail,
//             //       });
//             //     }
//             //   } catch (error) {
//             //     console.error("Erreur lors du chargement des identifiants:", error);
//             //   }
//         };

//         loadSavedCredentials();
//     }, []);

//     // Handlers
//     const clearErrors = () => {
//         setErrors({ email: "", password: "", general: "" });
//     };

//     const updateError = useCallback((field: keyof LoginForm, error: string) => {
//         setErrors((prev) => ({ ...prev, [field]: error }));
//     }, []);

//     const updateForm = useCallback(
//         (field: keyof LoginForm, value: string | boolean) => {
//             clearErrors();
//             setForm((prev) => ({ ...prev, [field]: value }));

//             // Clear related errors
//             if (field === "email" || field === "password") {
//                 setErrors((prev) => ({ ...prev, [field]: "", general: "" }));
//             }
//         },
//         []
//     );

//     const handleEmailChange = (text: string) => {
//         updateForm("email", text);
//     };

//     const handlePasswordChange = (text: string) => {
//         updateForm("password", text);
//     };

//     const handleRememberMeChange = () => {
//         updateForm("rememberMe", !form.rememberMe);
//     };

//     const clearField = (field: keyof LoginForm) => {
//         const value = field === "rememberMe" ? false : "";
//         updateForm(field, value);
//     };

//     const validateForm = () => {
//         // const emailValidation = validateEmail(form.email);
//         // const passwordValidation = validatePassword(form.password);

//         // // Focus on first error field
//         // if (!emailValidation.isValid) {
//         //   updateError("email", emailValidation.error);
//         //   emailRef.current?.focus();
//         //   return false;
//         // }
//         // if (!passwordValidation.isValid) {
//         //   updateError("password", passwordValidation.error);
//         //   passwordRef.current?.focus();
//         //   return false;
//         // }

//         // return emailValidation.isValid && passwordValidation.isValid;
//     };

//     const saveCredentials = async () => {
//         try {
//             //   if (form.rememberMe) {
//             //     await Promise.all([
//             //       storeData(Local_Storage.email, form.email),
//             //       storeData(Local_Storage.password, form.password),
//             //     ]);
//             //   } else {
//             //     await Promise.all([
//             //       removeData(Local_Storage.email),
//             //       removeData(Local_Storage.password),
//             //     ]);
//             //   }
//         } catch (error) {
//             console.error("Erreur lors de la sauvegarde:", error);
//         }
//     };

//     const handleSubmit = async () => {
//         // try {
//         //   clearErrors();
//         //   if (!validateForm()) {
//         //     return;
//         //   }
//         //   setIsLoading(true);

//         //   const isConnected = await testConnexion();

//         //   const response = await loginUser(
//         //     form.email,
//         //     form.password,
//         //     isConnected,
//         //     usersLocal
//         //   );

//         //   await saveCredentials();

//         //   if (response.code === 200) {
//         //     const userId = response.data.id;
//         //     const userEmail = response.data.email || form.email;

//         //     // ✅ Vérifier si l'utilisateur existe déjà dans le store
//         //     const currentState = store.getState();

//         //     let existingUser = null;

//         //     const users = currentState?.gestionAccess?.connectedUsers;

//         //     if (Array.isArray(users)) {
//         //       console.log("Initialisation d'un nouvel utilisateur:", users);
//         //       existingUser = users.find((user) => user.id === userId);
//         //     }

//         //     if (!existingUser) {
//         //       // ✅ Initialiser un nouvel utilisateur
//         //       dispatch(
//         //         initializeUser({
//         //           id: userId,
//         //           email: userEmail,
//         //         })
//         //       );
//         //     } else {
//         //       // ✅ Basculer vers l'utilisateur existant
//         //       console.log("Basculement vers utilisateur existant:", userId);
//         //       dispatch(setCurrentUser(userId));
//         //       dispatch(setCurrentMainUser(userId));
//         //     }

//         //     // ✅ Mettre à jour les informations d'authentification
//         //     dispatch(
//         //       loginSuccess({
//         //         token: response.token,
//         //         user: response.data,
//         //       })
//         //     );

//         //     // ✅ Synchroniser les données pour l'utilisateur actuel
//         //     try {
//         //     //   await syncAllUserData(dispatch, isConnected);
//         //     //   console.log("Synchronisation des données réussie");
//         //     // } catch (syncError) {
//         //     //   console.warn("Erreur lors de la synchronisation:", syncError);
//         //     //   // Ne pas bloquer la connexion si la sync échoue
//         //     // }

//         //     // // ✅ Ajouter/mettre à jour l'utilisateur dans la liste globale
//         //     // if (typeof addOrUpdateUser === "function") {
//         //     //   dispatch(addOrUpdateUser(response.data));
//         //     }

//         //     // router.replace("/appDrawer/appMain/(home)");
//         //     // console.log("Connexion réussie pour l'utilisateur:", userId);
//         //   } else if (response.code === 901) {
//         //     setErrors((prev) => ({
//         //       ...prev,
//         //       general: "Utilisateur n'existe pas",
//         //     }));
//         //   } else if (response.code === 900) {
//         //     setErrors((prev) => ({
//         //       ...prev,
//         //       general: response.messages,
//         //     }));
//         //   } else {
//         //     console.log("Login attempt:", response);
//         //     setErrors((prev) => ({
//         //       ...prev,
//         //       general:
//         //         "Premier utilisation. \n Veuillez vous connecter sur internet",
//         //     }));
//         //   }
//         // } catch (error) {
//         //   setErrors((prev) => ({
//         //     ...prev,
//         //     general: "Une erreur inattendue est survenue",
//         //   }));
//         //   console.error("Erreur de connexion:", error);
//         // } finally {
//         //   setIsLoading(false);
//         // }
//     };

//     const handleForgotPassword = () => {
//         // router.navigate("/(auth)/resetPassword");
//     };

//     //   if (isLoading) {
//     //     return (
//     //       <CustomLoading
//     //         text_one="Connexion en cours..."
//     //         text_two="Veuillez patienter s'il vous plaît"
//     //       />
//     //     );
//     //   }

//     //   if (true) {
//     //     return (
//     //         <AdvancedOfflineModal isOffline={true} />
//     //     )
//     //   }

//     return (
//         <View style={styles.container}>
//             {/* <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={styles.container}
//             > */}

//             {/* <AdvancedOfflineModal isOffline={true} /> */}
//             <ScrollView
//                 contentContainerStyle={styles.scrollContent}
//                 keyboardShouldPersistTaps="handled"
//             >
//                 <View
//                     style={[
//                         styles.card,
//                         // isKeyboardVisible && styles.cardKeyboardVisible,
//                     ]}
//                 >
//                     {/* Logo */}
//                     <View style={styles.logoContainer}>
//                         <Image source={images.logo} style={styles.logo} />
//                     </View>

//                     {/* Titre */}
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>Se connecter</Text>
//                         {errors.general ? (
//                             <Text style={styles.errorText}>{errors.general}</Text>
//                         ) : null}
//                     </View>

//                     {/* Form */}
//                     <View style={styles.form}>
//                         <CustomTextInput
//                             ref={emailRef}
//                             label="Utilisateur"
//                             labelStyle={styles.inputLabel}
//                             isRequired={true}
//                             returnKeyType="next"
//                             keyboardType="email-address"
//                             value={form.email}
//                             onSubmitEditing={() => passwordRef.current?.focus()}
//                             onChange={handleEmailChange}
//                             clearText={() => clearField("email")}
//                             error={errors.email}
//                             enableSubmitEditing={true}
//                         />

//                         <View style={styles.passwordSection}>
//                             <CustomTextInput
//                                 ref={passwordRef}
//                                 label="Mot de passe"
//                                 labelStyle={styles.inputLabel}
//                                 isRequired={true}
//                                 value={form.password}
//                                 showEyeIcon={true}
//                                 secureTextEntry={!isPasswordVisible}
//                                 eye={!isPasswordVisible}
//                                 onChange={handlePasswordChange}
//                                 clearText={() => clearField("password")}
//                                 onPressOne={() => setIsPasswordVisible(true)}
//                                 onPressOff={() => setIsPasswordVisible(false)}
//                                 error={errors.password}
//                                 enableSubmitEditing={true}
//                             // handleForgotPassword={handleForgotPassword}
//                             />

//                             <View style={styles.checkboxContainer}>
//                                 <TouchableOpacity
//                                     activeOpacity={0.7}
//                                     // style={styles.checkboxContainer}
//                                     onPress={() => setRememberMe(!rememberMe)}
//                                 >
//                                     <Checkbox
//                                         value={rememberMe}
//                                         onValueChange={setRememberMe}
//                                         color={rememberMe ? "#c2026d" : undefined}
//                                         style={{ transform: [{ scale: 0.75 }], borderRadius: 4 }}
//                                     />
//                                     <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>

//                     {/* Actions */}
//                     <View style={styles.actions}>
//                         <PrimaryButton
//                             title="Se connecter"
//                             color={Colors.button.primary}
//                             onPress=""
//                         />
//                         <PrimaryButton
//                             title="Créer un compte"
//                             textColor={Colors.button.primary}
//                             color={Colors.button.tertiary}
//                             onPress=""
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//             {/* </KeyboardAvoidingView> */}
//         </View>
//     );
// };

// export default Index;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 25,
//     },
//     card: {
//         backgroundColor: "#ffffff",
//         borderRadius: 10,
//         padding: 20,
//         height: "auto",
//         // maxHeight: "80%",
//         width: "100%",
//         // maxWidth: 650,
//         // justifyContent: "space-between",
//     },
//     cardKeyboardVisible: {
//         // height: "100%",
//         // maxHeight: "100%",
//     },
//     header: {
//         height: "30%",
//     },
//     logoContainer: {
//         justifyContent: "center",
//         alignItems: "center",
//         // backgroundColor: 'red',
//         height: "20%",
//     },
//     logo: {
//         height: 98,
//         width: wp(120),
//         maxWidth: "80%",
//         resizeMode: "contain",
//     },
//     titleContainer: {
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 10,
//         height: "15%",
//     },
//     title: {
//         textAlign: "center",
//         fontSize: 26,
//         color: "gray",
//         fontFamily: fonts.Poppins.Light,
//     },
//     errorText: {
//         textAlign: "center",
//         color: "red",
//         fontFamily: fonts.Poppins.Light,
//         fontSize: 14,
//         marginTop: -wp(2),
//     },
//     form: {
//         flex: 1,
//         justifyContent: "center",
//         gap: 20,
//         // backgroundColor: 'red'
//     },
//     inputLabel: {
//         fontWeight: "normal",
//     },
//     passwordSection: {
//         // gap: 15,
//     },
//     checkboxContainer: {
//         flexDirection: "row",
//         justifyContent: "flex-start",
//     },
//     actions: {
//         height: "auto",
//         justifyContent: "flex-end",
//     },
// });


