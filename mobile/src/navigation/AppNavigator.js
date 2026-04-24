import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import CareHubScreen from "../screens/CareHubScreen";
import PetListScreen from "../screens/PetListScreen";
import AddPetScreen from "../screens/AddPetScreen";
import ReminderListScreen from "../screens/ReminderListScreen";
import AddReminderScreen from "../screens/AddReminderScreen";
import AIChatScreen from "../screens/AIChatScreen";
import PremiumScreen from "../screens/PremiumScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: "#2f8660" },
  headerTintColor: "#ffffff",
  headerTitleStyle: { fontWeight: "700" },
  contentStyle: { backgroundColor: "#f9f3ea" },
};

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Stack.Screen
        name="Premium"
        component={PremiumScreen}
        options={{ title: "Premium" }}
      />
    </Stack.Navigator>
  );
}

function ChatbotStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="AIChat"
        component={AIChatScreen}
        options={{ title: "Chatbot" }}
      />
    </Stack.Navigator>
  );
}

function CareStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="CareHub"
        component={CareHubScreen}
        options={{ title: "Pets & Reminders" }}
      />
      <Stack.Screen
        name="PetList"
        component={PetListScreen}
        options={{ title: "Pets" }}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{ title: "Add Pet" }}
      />
      <Stack.Screen
        name="ReminderList"
        component={ReminderListScreen}
        options={{ title: "Reminders" }}
      />
      <Stack.Screen
        name="AddReminder"
        component={AddReminderScreen}
        options={{ title: "Add Reminder" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 78,
          backgroundColor: "#fdfbf6",
          borderTopWidth: 1,
          borderTopColor: "#ecd7cc",
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#f0b200",
        tabBarInactiveTintColor: "#8f9a94",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={CareStack}
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 17 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ChatbotTab"
        component={ChatbotStack}
        options={{
          title: "Chatbot",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 17 }}>💬</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 17 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
