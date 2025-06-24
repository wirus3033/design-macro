import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  color = '#163E71',
  textColor = '#fff',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: disabled ? '#A0A0A0' : color },
      style,
    ]}
    activeOpacity={0.7}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color={textColor} />
    ) : (
      <Text style={[styles.buttonText, { color: textColor }, textStyle]} allowFontScaling={false}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    // fontFamily: 'Poppins-Bold', // décommente si tu utilises la font
    textAlign: 'center',
  },
});

export default PrimaryButton;
