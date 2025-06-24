
import fonts from "@/src/constants/assets/fonts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useImperativeHandle,
    useState
} from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text, TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";

type Props = {
    label: string;
    value: string;
    placeholder?: string;
    returnKeyType?: "done" | "next" | "go" | "search" | "send";
    isRequired?: boolean;
    showEyeIcon?: boolean;
    eye?: boolean;
    icon?: any;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    error?: string;
    isTextLabel?: boolean;
    multiline?: boolean;
    enableSubmitEditing?: boolean;
    onSubmitEditing?: () => void;
    onChange: (text: string) => void;
    clearText?: () => void;
    onPressOne?: () => void;
    onPressOff?: () => void;
    onBlur?: () => void;
    disabled?: boolean;
    autoFocusOnError?: boolean;
    containerrStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    isSimpleMultiline?: boolean;
    handleForgotPassword?: () => void;
};

// Interface pour exposer des méthodes supplémentaires via la ref
export interface CustomTextInputRef {
    focus: () => void;
    blur: () => void;
    clear: () => void;
}

const CustomTextInputComponent: ForwardRefRenderFunction<
    CustomTextInputRef,
    Props
> = (props, ref) => {
    // Créer une référence interne au TextInput
    const inputRef = React.useRef<TextInput>(null);

    // État pour suivre si ce champ spécifique est focalisé
    const [isFocused, setIsFocused] = useState(false);

    // Exposer les méthodes via la ref
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: () => inputRef.current?.clear(),
    }));

    const showClearButton =
        props.value?.length > 0 &&
        !props.showEyeIcon &&
        typeof props.clearText === "function";

    return (
        <View style={[props.containerrStyle]}>
            <View style={styles.contentLibelle}>
                <Text
                    style={[
                        styles.label,
                        props.isTextLabel && { color: 'gray', fontWeight: "400" },
                        props.labelStyle,
                    ]}
                >
                    {props.label}
                    {props.isRequired && <Text style={styles.etoile}> *</Text>}
                </Text>

                {props.handleForgotPassword && (
                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={props.handleForgotPassword}
                    >
                        <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View
                style={[
                    styles.inputContainer,
                    props.multiline && {
                        paddingTop: 8,
                        height: "auto",
                        justifyContent: "flex-start",
                    },
                    props.isSimpleMultiline && {
                        height: 45,
                        paddingHorizontal: 12,
                        // backgroundColor:'red',
                        flexDirection: "row",
                    },
                    // @ts-ignore
                    props.error && styles.borderError,
                ]}
            >
                <TextInput
                    ref={inputRef}
                    editable={!props.disabled}
                    multiline={props.multiline}
                    numberOfLines={1}
                    style={[
                        styles.input,
                        props.isTextLabel && {
                            //   color: Colors._textLabel,
                            fontWeight: "400",
                        },
                        props.multiline && {
                            minHeight: 70,
                            height: "100%",
                            flex: 1,
                            textAlignVertical: "top",
                        },
                        props.isSimpleMultiline && {
                            // backgroundColor:'red',
                            minHeight: 25,
                            maxHeight: 26,
                            lineHeight: 25,
                            marginTop: -10,
                            textAlignVertical: "top",
                        }
                        // ,{ outlineStyle: 'none' }
                    ]}
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType}
                    value={props.value}
                    onChangeText={props.onChange}
                    autoCapitalize="none"
                    textContentType="none"
                    autoCorrect={false}
                    inputMode="text"
                    enterKeyHint="enter"
                    importantForAutofill="no"
                    autoComplete="cc-middle-name"
                    returnKeyType={props.returnKeyType}
                    onSubmitEditing={
                        props.enableSubmitEditing ? props.onSubmitEditing : undefined
                    }
                    onBlur={() => {
                        setIsFocused(false);
                        props.onBlur?.();
                    }}
                    onFocus={() => setIsFocused(true)}
                />
                {props.showEyeIcon && (
                    <Pressable
                        style={{ position: "absolute", right: 10 }}
                        onPress={props.eye ? props.onPressOne : props.onPressOff}
                        hitSlop={8}
                    >
                        <MaterialCommunityIcons
                            name={props.eye ? "eye-off" : "eye"}
                            size={22}
                        //   color={Colors._light}
                        />
                    </Pressable>
                )}

                {/* Bouton effacer  */}
                {showClearButton && !props.disabled && isFocused && (
                    <Pressable
                        style={[
                            { position: "absolute", right: 6 },
                            props.multiline && { top: 10 },
                        ]}
                        onPress={props.clearText}
                        hitSlop={8}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={24}
                        //   color={Colors._light}
                        />
                    </Pressable>
                )}
            </View>

            {/* Content error */}
            {props.error && (
                <Text style={{ color: 'red', fontFamily: fonts.Roboto.condensed }}>
                    {props.error}
                </Text>
            )}
        </View>
    );
};

const CustomTextInput = forwardRef<CustomTextInputRef, Props>(
    CustomTextInputComponent
);

const styles = StyleSheet.create({
    contentLibelle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    label: {
        // fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5,
        // color: Colors._charcoalGray,
        fontSize: 14,
        // fontFamily: fonts.condensed,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginTop: 10,
        marginBottom: 5,
    },
    forgotText: {
        // color: Colors._gray,
        fontSize: 15,
        // fontFamily: fonts.condensed,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 46,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        marginLeft: 3.2,
        flex: 1,
        height: "70%",
        // outline: "none",
        // outlineColor: "transparent",
        fontSize: 16,
        borderWidth: 0,
        borderBlockColor: "transparent",
        color: "#ccc",
        // fontFamily: fonts.Roboto.condensed,
        // backgroundColor:'#cccccc',
    },
    etoile: {
        color: 'red',
    },
    borderError: {
        borderColor: 'red',
    }
});

export default CustomTextInput;