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
import Input from "../components/Input";
import { addPet } from "../services/api";

export default function AddPetScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !type.trim()) {
      Alert.alert("Validation", "Name and type are required.");
      return;
    }

    setSaving(true);
    try {
      await addPet({
        name: name.trim(),
        type: type.trim(),
        age: age ? Number(age) : undefined,
        breed: breed.trim(),
      });
      Alert.alert("Success", "Pet added successfully.");
      setName("");
      setType("");
      setAge("");
      setBreed("");
      navigation.navigate("PetList");
    } catch (error) {
      Alert.alert("Error", error?.message || "Could not add pet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.headerCard}>
          <Text style={styles.kicker}>Create Profile</Text>
          <Text style={styles.title}>Add New Pet</Text>
          <Text style={styles.subtitle}>
            Save your pet details to manage reminders and AI support easily.
          </Text>
        </Card>

        <Card style={styles.formCard}>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Luna"
          />
          <Input
            label="Type"
            value={type}
            onChangeText={setType}
            placeholder="e.g. Dog"
          />
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <Input
                label="Age"
                value={age}
                onChangeText={setAge}
                placeholder="e.g. 3"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexItem}>
              <Input
                label="Breed"
                value={breed}
                onChangeText={setBreed}
                placeholder="e.g. Golden"
              />
            </View>
          </View>

          <Button title="Save Pet" onPress={handleSubmit} loading={saving} />
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  flexItem: {
    flex: 1,
  },
});
