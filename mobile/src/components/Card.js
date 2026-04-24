import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffdf9",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eadfd8",
    padding: 16,
    shadowColor: "#7a746f",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
});
