import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline = false,
}) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputShell}>
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ea79f"
          keyboardType={keyboardType}
          multiline={multiline}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 13,
    color: "#456353",
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  inputShell: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eadfd8",
    backgroundColor: "#fffdf8",
    shadowColor: "#7f7a75",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  input: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#20322a",
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
});
