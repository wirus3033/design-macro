import Checkbox from 'expo-checkbox';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/ui/CustomTextInputLogin';
import PrimaryButton from '../components/ui/PrimaryButton';
import fonts from '../constants/assets/fonts';
import { Colors } from '../constants/Colors';
const Index = () => {

    const emailRef = useRef(null);
    const mdpRef = useRef(null);

    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mdpError, setMdpError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const onEmailChange = (val) => {
        setEmail(val);
        setEmailError('');
    };
    const onMdpChange = (val) => {
        setMdp(val);
        setMdpError('');
    };
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                enableAutomaticScroll
                enableOnAndroid
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={120}
            >
                <View style={{ flex: 1 }}>
                    <View style={styles.textConnectionContainer}>
                        <Text style={styles.titleText}>Se connecter</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            ref={emailRef}
                            label="Utilisateur"
                            isRequired
                            keyboardType="email-address"
                            value={email}
                            onChange={onEmailChange}
                            error={emailError}
                            clearText={() => onEmailChange('')}
                            placeholder="nom@email.com"
                            autoFocusOnError={!!emailError}
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
                            clearText={() => onMdpChange('')}
                            placeholder="********"
                            autoFocusOnError={!!mdpError}
                        />
                    </View>
                    <View style={styles.checkboxContainerc}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
                            <Checkbox value={rememberMe} onValueChange={setRememberMe} color={rememberMe ? '#163E71' : undefined} style={{ transform: [{ scale: 0.75 }], borderRadius: 4 }} />
                            <Text allowFontScaling={false} style={styles.checkboxLabel}>
                                Se souvenir de moi
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomSection}>
                        <PrimaryButton
                            title="Se connecter"
                            color= {Colors.button.primary}
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
        backgroundColor: '#fff',
    },
    textConnectionContainer: {
        width: '100%',
        height: 45,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontFamily: fonts.Poppins.Light,
        color: '#212B37',
        top: 12,
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: 6,
        borderColor: '#ccc',
        // borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    checkboxContainerc: {
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        marginTop: 6,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 4,
    },
    checkboxLabel: {
        marginLeft: 8,
        color: '#5F6368',
        fontSize: 14,
        fontFamily: fonts.Poppins.Light,
    },
    bottomSection: {
        width: '100%',
        marginTop: 18,
        flexDirection: 'row',
        columnGap: 10,
        paddingHorizontal: '8%',
    },
    passwordButton: {
        backgroundColor: '#163E71',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 5,
    },
    passwordText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: fonts.Poppins.Bold,
    },
});

export default Index;
