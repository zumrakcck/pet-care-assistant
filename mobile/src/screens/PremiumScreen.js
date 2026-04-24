import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import { addSubscription } from "../services/api";

export default function PremiumScreen() {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const activatePremium = async () => {
    setLoading(true);
    try {
      await addSubscription({
        plan: "premium",
        active: true,
        startedAt: new Date().toISOString(),
      });
      setActive(true);
      Alert.alert("Success", "Premium subscription activated.");
    } catch (error) {
      Alert.alert("Error", "Could not activate subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Upgrade Your Care</Text>
        <Text style={styles.pageSubtitle}>
          Get deeper AI support and premium tracking features.
        </Text>

        <Card style={styles.pricingCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Most Popular</Text>
          </View>

          <Text style={styles.title}>Premium Plan</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$9.99</Text>
            <Text style={styles.period}>/month</Text>
          </View>

          <Text style={styles.description}>
            • AI-first pet care suggestions
          </Text>
          <Text style={styles.description}>
            • Reminder insights and smart tips
          </Text>
          <Text style={styles.description}>• Priority support features</Text>

          <Text style={styles.status}>
            Status: {active ? "Active" : "Inactive"}
          </Text>

          <Button
            title={active ? "Premium Active" : "Activate Premium"}
            onPress={activatePremium}
            loading={loading}
            disabled={active}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f3ea",
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1a4535",
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 15,
    color: "#638072",
    lineHeight: 21,
    marginBottom: 16,
  },
  pricingCard: {
    backgroundColor: "#fffdf8",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffeef3",
    borderColor: "#f1ced9",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  badgeText: {
    color: "#96576c",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#194735",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  price: {
    fontSize: 36,
    fontWeight: "800",
    color: "#2f8660",
    lineHeight: 40,
  },
  period: {
    fontSize: 14,
    color: "#6d7d74",
    marginBottom: 5,
    marginLeft: 6,
  },
  description: {
    fontSize: 15,
    color: "#3d5b4f",
    lineHeight: 23,
    marginBottom: 2,
  },
  status: {
    fontSize: 15,
    color: "#1f3a2f",
    fontWeight: "700",
    marginTop: 14,
    marginBottom: 16,
  },
});
