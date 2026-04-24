import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = "primary",
}) {
  const isSecondary = variant === "secondary";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? "#3f4f46" : "#ffffff"} />
      ) : (
        <Text
          style={[styles.text, isSecondary && styles.secondaryText, textStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2e624d",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#2f8660",
    borderWidth: 1,
    borderColor: "#2b7353",
  },
  secondaryButton: {
    backgroundColor: "#fff7f8",
    borderWidth: 1,
    borderColor: "#efc8d2",
    shadowColor: "#a35166",
  },
  buttonDisabled: {
    opacity: 0.58,
  },
  text: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  secondaryText: {
    color: "#4f5f56",
  },
});
