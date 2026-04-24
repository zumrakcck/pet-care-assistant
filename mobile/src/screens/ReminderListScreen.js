import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import { getReminders } from "../services/api";

export default function ReminderListScreen() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReminders = async () => {
    setLoading(true);
    try {
      const data = await getReminders();
      setReminders(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert("Error", "Could not fetch reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.title}>{item.title || "Reminder"}</Text>
        <Text style={styles.tag}>Reminder</Text>
      </View>
      <Text style={styles.info}>Pet: {item.petName || item.pet || "-"}</Text>
      <Text style={styles.info}>Date: {item.date || item.time || "-"}</Text>
      {item.note ? <Text style={styles.info}>Note: {item.note}</Text> : null}
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.heading}>Care Reminders</Text>
          <Text style={styles.subheading}>
            Stay consistent with care schedules.
          </Text>
        </View>

        <Button
          title="Refresh List"
          onPress={fetchReminders}
          loading={loading}
          style={styles.refreshButton}
        />

        <FlatList
          data={reminders}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(item.id || item._id || index)}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.empty}>No reminders found.</Text>
            ) : null
          }
        />
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
    paddingBottom: 28,
  },
  headerCard: {
    backgroundColor: "#fffdf8",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eddace",
    padding: 16,
    marginBottom: 14,
  },
  refreshButton: {
    marginBottom: 14,
  },
  listContent: {
    gap: 12,
    paddingBottom: 10,
  },
  card: {
    marginBottom: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1b4535",
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: "#658072",
    lineHeight: 20,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d4535",
  },
  tag: {
    backgroundColor: "#ffeef3",
    color: "#95566b",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "700",
    fontSize: 12,
  },
  info: {
    fontSize: 14,
    color: "#4d6258",
    lineHeight: 21,
  },
  empty: {
    marginTop: 18,
    textAlign: "center",
    color: "#6d7d74",
    fontSize: 15,
  },
});
