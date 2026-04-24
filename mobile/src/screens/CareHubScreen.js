import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "../components/Card";
import { getPets } from "../services/api";

const actions = [
  {
    title: "Pet List",
    subtitle: "View all pets",
    icon: "🐶",
    screen: "PetList",
  },
  {
    title: "Add Pet",
    subtitle: "Create a pet profile",
    icon: "➕",
    screen: "AddPet",
  },
  {
    title: "Reminders",
    subtitle: "Upcoming care tasks",
    icon: "⏰",
    screen: "ReminderList",
  },
  {
    title: "Add Reminder",
    subtitle: "Schedule new task",
    icon: "🗓️",
    screen: "AddReminder",
  },
];

const dailyStatusItems = [
  { key: "meal", label: "Mama", icon: "🍴" },
  { key: "water", label: "Su", icon: "💧" },
  { key: "walk", label: "Gezinti", icon: "🚶" },
  { key: "clean", label: "Temizlik", icon: "🧹" },
];

export default function CareHubScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(Array.isArray(data) ? data : []);
      } catch (error) {
        Alert.alert("Error", error?.message || "Could not fetch pets.");
      }
    };

    fetchPets();
  }, []);

  const featuredPets = useMemo(() => pets.slice(0, 5), [pets]);

  const toggleStatus = (key) => {
    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderPetCard = ({ item }) => (
    <Pressable
      style={styles.petCard}
      onPress={() => navigation.navigate("PetList")}
    >
      <Text style={styles.petCardIcon}>🐾</Text>
      <Text style={styles.petCardName}>{item.name || "Isimsiz"}</Text>
      <Text style={styles.petCardMeta}>{item.type || "Tur bilinmiyor"}</Text>
      <Text style={styles.petCardMeta}>{item.breed || "Irk yok"}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.welcome}>Hos geldin,</Text>
            <Text style={styles.ownerName}>zumra</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.circleBtn}
              onPress={() => navigation.navigate("AddPet")}
            >
              <Text style={styles.plusText}>＋</Text>
            </Pressable>
            <View style={styles.profileAvatarWrap}>
              <Text style={styles.profileAvatar}>👤</Text>
            </View>
          </View>
        </View>

        <Card style={styles.featuredCard}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>Pet Kartlari</Text>
            <Pressable onPress={() => navigation.navigate("AddPet")}>
              <Text style={styles.featuredAction}>Yeni Ekle</Text>
            </Pressable>
          </View>

          <FlatList
            horizontal
            data={featuredPets}
            renderItem={renderPetCard}
            keyExtractor={(item, index) => String(item.id || index)}
            contentContainerStyle={styles.petsList}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.noPetText}>
                Henuz pet yok. Ilk petini ekle.
              </Text>
            }
          />
        </Card>

        <Text style={styles.sectionTitle}>Gunluk Durum</Text>
        <View style={styles.statusRow}>
          {dailyStatusItems.map((item) => {
            const done = !!completed[item.key];
            return (
              <Pressable
                key={item.key}
                style={styles.statusItem}
                onPress={() => toggleStatus(item.key)}
              >
                <View
                  style={[
                    styles.statusIconWrap,
                    done && styles.statusIconWrapDone,
                  ]}
                >
                  <Text style={styles.statusIcon}>
                    {done ? "✓" : item.icon}
                  </Text>
                </View>
                <Text
                  style={[styles.statusLabel, done && styles.statusLabelDone]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={styles.reminderCard}
          onPress={() => navigation.navigate("ReminderList")}
        >
          <View>
            <Text style={styles.reminderTitle}>Yaklasan Hatirlatmalar</Text>
            <Text style={styles.reminderSubtitle}>Yaklasan hatirlatma yok</Text>
          </View>
          <Text style={styles.reminderArrow}>›</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Hizli Erisim</Text>

        <View style={styles.grid}>
          {actions.map((item) => (
            <Pressable
              key={item.screen}
              style={styles.gridItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.floatingAi}
          onPress={() => navigation.getParent()?.navigate("ChatbotTab")}
        >
          <Text style={styles.floatingAiIcon}>🤖</Text>
          <Text style={styles.floatingAiText}>Pet AI</Text>
        </Pressable>
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
    paddingBottom: 40,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  welcome: {
    fontSize: 18,
    color: "#8a8d96",
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2129",
    lineHeight: 31,
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  circleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f4f4f3",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d5d5d7",
  },
  plusText: { fontSize: 30, color: "#f0b200", marginTop: -2 },
  profileAvatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d8d8de",
  },
  profileAvatar: { fontSize: 28 },
  featuredCard: {
    borderRadius: 24,
    backgroundColor: "#fffef9",
    borderColor: "#ddd7cb",
    minHeight: 170,
    padding: 14,
    marginBottom: 16,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#262834",
  },
  featuredAction: {
    color: "#f0b200",
    fontWeight: "700",
    fontSize: 13,
  },
  petsList: {
    paddingVertical: 4,
  },
  petCard: {
    width: 150,
    backgroundColor: "#f7c20b",
    borderRadius: 18,
    padding: 12,
    marginRight: 10,
  },
  petCardIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  petCardName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1f2129",
    marginBottom: 4,
  },
  petCardMeta: {
    fontSize: 12,
    color: "#5b4a0d",
    fontWeight: "700",
  },
  noPetText: {
    fontSize: 14,
    color: "#848894",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#24262f",
    marginBottom: 14,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  statusItem: { alignItems: "center", width: "24%" },
  statusIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f6f6f7",
    borderColor: "#d5d6d9",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statusIconWrapDone: {
    backgroundColor: "#d6f0de",
    borderColor: "#83c295",
  },
  statusIcon: { fontSize: 28 },
  statusLabel: { fontSize: 13, color: "#8b8d95", fontWeight: "700" },
  statusLabelDone: {
    color: "#2f8660",
  },
  reminderCard: {
    backgroundColor: "#f8f8f8",
    borderColor: "#d7d8dc",
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  reminderTitle: {
    fontSize: 17,
    color: "#24262f",
    fontWeight: "800",
    marginBottom: 8,
  },
  reminderSubtitle: { fontSize: 16, color: "#8a8d96", fontWeight: "600" },
  reminderArrow: { fontSize: 30, color: "#8a8d96", marginTop: -5 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    marginBottom: 20,
  },
  gridItem: {
    width: "48.3%",
    backgroundColor: "#f7f7f8",
    borderColor: "#d9dade",
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    minHeight: 128,
    shadowColor: "#7e828f",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 17,
    color: "#252833",
    fontWeight: "700",
    marginBottom: 4,
  },
  itemSubtitle: {
    color: "#7f8391",
    fontSize: 13,
    lineHeight: 18,
  },
  floatingAi: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9c400",
    borderRadius: 26,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#9a832d",
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  floatingAiIcon: { fontSize: 22, marginRight: 8 },
  floatingAiText: { fontSize: 18, color: "#1e1f25", fontWeight: "800" },
});
