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
import { getPets } from "../services/api";

export default function PetListScreen() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert("Error", "Could not fetch pets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardTopRow}>
        <Text style={styles.petName}>{item.name || "Unnamed Pet"}</Text>
        <Text style={styles.petTypeBadge}>{item.type || "Unknown"}</Text>
      </View>
      <Text style={styles.petInfo}>Breed: {item.breed || "-"}</Text>
      <Text style={styles.petInfo}>Age: {item.age ?? "-"} years</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.heading}>Pet Profiles</Text>
          <Text style={styles.subheading}>
            All registered pets in your care list.
          </Text>
        </View>

        <Button
          title="Refresh List"
          onPress={fetchPets}
          loading={loading}
          style={styles.refreshButton}
        />

        <FlatList
          data={pets}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(item.id || item._id || index)}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.emptyText}>No pets found.</Text>
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
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  petName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123d2d",
  },
  petTypeBadge: {
    backgroundColor: "#ffeef3",
    color: "#95566b",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "700",
    fontSize: 12,
  },
  petInfo: {
    fontSize: 14,
    color: "#4d6258",
    lineHeight: 21,
  },
  emptyText: {
    marginTop: 18,
    textAlign: "center",
    color: "#6d7d74",
    fontSize: 15,
  },
});
