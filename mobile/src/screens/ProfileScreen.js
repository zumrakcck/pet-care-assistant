import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.heroCard}>
          <Text style={styles.kicker}>Profil</Text>
          <Text style={styles.title}>Zumra K.</Text>
          <Text style={styles.subtitle}>
            Hesap tercihlerini, abonelik durumunu ve AI deneyimini buradan
            yonetebilirsin.
          </Text>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Hesap Ozeti</Text>
          <View style={styles.row}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>demo-user</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Plan</Text>
            <Text style={styles.value}>Free</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>AI Access</Text>
            <Text style={styles.value}>Active</Text>
          </View>
        </Card>

        <Button
          title="Premium'e Gec"
          onPress={() => navigation.navigate("Premium")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eff0f4",
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: "#f7f7f9",
    borderColor: "#d8d9de",
    marginBottom: 14,
  },
  kicker: {
    fontSize: 12,
    color: "#717784",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1f2129",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8492",
    lineHeight: 21,
  },
  infoCard: {
    backgroundColor: "#f7f7f9",
    borderColor: "#d8d9de",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#252834",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#7e8392",
    fontSize: 14,
  },
  value: {
    color: "#333745",
    fontSize: 14,
    fontWeight: "700",
  },
});
