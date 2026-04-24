import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { addReminder } from "../services/api";

export default function AddReminderScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [pet, setPet] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Reminder title is required.");
      return;
    }

    setSaving(true);
    try {
      await addReminder({
        title: title.trim(),
        pet: pet.trim(),
        date: date.trim(),
        note: note.trim(),
      });
      Alert.alert("Success", "Reminder added successfully.");
      setTitle("");
      setPet("");
      setDate("");
      setNote("");
      navigation.navigate("ReminderList");
    } catch (error) {
      Alert.alert("Error", "Could not add reminder.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.headerCard}>
          <Text style={styles.kicker}>Planner</Text>
          <Text style={styles.title}>Add Reminder</Text>
          <Text style={styles.subtitle}>
            Set medication, feeding or appointment reminders for your pet.
          </Text>
        </Card>

        <Card style={styles.formCard}>
          <Input
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Vaccination"
          />
          <Input
            label="Pet Name"
            value={pet}
            onChangeText={setPet}
            placeholder="e.g. Max"
          />
          <Input
            label="Date / Time"
            value={date}
            onChangeText={setDate}
            placeholder="e.g. 2026-04-25 10:00"
          />
          <Input
            label="Note"
            value={note}
            onChangeText={setNote}
            placeholder="Optional note"
            multiline
          />

          <Button
            title="Save Reminder"
            onPress={handleSubmit}
            loading={saving}
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
    paddingBottom: 28,
  },
  headerCard: {
    marginBottom: 14,
    backgroundColor: "#fffdf8",
  },
  kicker: {
    fontSize: 12,
    color: "#5f7a6c",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1b4636",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#658073",
    lineHeight: 21,
  },
  formCard: {
    backgroundColor: "#fffdf8",
  },
});
