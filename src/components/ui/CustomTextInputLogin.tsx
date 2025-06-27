import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    useImperativeHandle,
    useState,
} from "react";
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  isRequired?: boolean;
  showEyeIcon?: boolean;
  eye?: boolean;
  icon?: string; // <- ajout : icône à gauche
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
};

export interface CustomTextInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

const CustomTextInputComponent: ForwardRefRenderFunction<
  CustomTextInputRef,
  Props
> = (props, ref) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
  }));

  const showClearButton =
    props.value?.length > 0 &&
    !props.showEyeIcon &&
    typeof props.clearText === "function";

  const borderColor = props.error
    ? "red"
    : isFocused
    ? "#c2026d"
    : "#ccc";

  return (
    <View style={[styles.container, props.containerrStyle]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, props.labelStyle]}>
          {props.label}
          {props.isRequired && <Text style={styles.asterisk}> *</Text>}
        </Text>
      </View>

      <View style={[styles.inputWrapper, { borderBottomColor: borderColor }]}>
        {/* Icône à gauche */}
        {props.icon && (
          <MaterialCommunityIcons
            name={props.icon}
            size={20}
            color={borderColor}
            style={{ marginRight: 10 }}
          />
        )}

        <TextInput
          ref={inputRef}
          editable={!props.disabled}
          multiline={props.multiline}
          style={styles.input}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          value={props.value}
          onChangeText={props.onChange}
          autoCapitalize="none"
          textContentType="none"
          autoCorrect={false}
          secureTextEntry={props.secureTextEntry}
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

        {/* Eye icon */}
        {props.showEyeIcon && (
          <Pressable
            style={styles.eyeIcon}
            onPress={props.eye ? props.onPressOne : props.onPressOff}
          >
            <MaterialCommunityIcons
              name={props.eye ? "eye-off" : "eye"}
              size={22}
              color={borderColor}
            />
          </Pressable>
        )}

        {/* Clear button */}
        {showClearButton && !props.disabled && isFocused && (
          <Pressable style={styles.clearIcon} onPress={props.clearText}>
            <MaterialCommunityIcons name="close" size={20} color={borderColor} />
          </Pressable>
        )}
      </View>

      {/* Erreur */}
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
};

const CustomTextInput = forwardRef<CustomTextInputRef, Props>(
  CustomTextInputComponent
);

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  asterisk: {
    color: "#c2026d",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  eyeIcon: {
    marginLeft: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
  },
});
