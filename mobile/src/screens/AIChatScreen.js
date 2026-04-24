import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { sendMessageToAI } from "../services/api";

export default function AIChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [userMessage, ...prev]);
    setMessage("");
    setSending(true);

    try {
      const response = await sendMessageToAI({ message: trimmed });
      const aiText =
        response?.data?.response ||
        response?.reply ||
        response?.response ||
        response?.data?.message ||
        response?.message ||
        (typeof response === "string" ? response : "AI response received.");

      const aiMessage = {
        id: `${Date.now()}-ai`,
        role: "ai",
        text: aiText,
      };

      setMessages((prev) => [aiMessage, ...prev]);
    } catch (error) {
      Alert.alert("Error", error?.message || "Could not send message to AI.");
    } finally {
      setSending(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.role === "user" ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.bubbleLabel}>
        {item.role === "user" ? "You" : "AI"}
      </Text>
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>AI Pet Chat</Text>
          <Text style={styles.headerSubtitle}>
            Ask health, nutrition, and behavior questions instantly.
          </Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={
            <Text style={styles.empty}>Ask anything about your pet care.</Text>
          }
        />

        <View style={styles.composer}>
          <Input
            label="Your Message"
            value={message}
            onChangeText={setMessage}
            placeholder="Type your question"
            multiline
          />
          <Button
            title="Send"
            onPress={handleSend}
            loading={sending}
            disabled={!message.trim()}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f3ea",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    backgroundColor: "#fffdf8",
    borderRadius: 20,
    borderColor: "#eddace",
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1b4535",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#648072",
    lineHeight: 20,
  },
  messageList: {
    paddingBottom: 14,
    gap: 10,
  },
  bubble: {
    borderRadius: 18,
    paddingVertical: 11,
    paddingHorizontal: 13,
    maxWidth: "84%",
  },
  userBubble: {
    backgroundColor: "#2f8660",
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },
  aiBubble: {
    backgroundColor: "#fff4f7",
    borderWidth: 1,
    borderColor: "#f0ccd7",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 5,
  },
  bubbleLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6a7470",
    marginBottom: 4,
  },
  bubbleText: {
    color: "#23332c",
    fontSize: 15,
    lineHeight: 20,
  },
  composer: {
    backgroundColor: "#fffdf8",
    borderTopWidth: 1,
    borderTopColor: "#eddace",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "#eddace",
    borderRightColor: "#eddace",
    borderBottomColor: "#eddace",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
  },
  sendButton: {
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    color: "#6d7d74",
    marginTop: 20,
    fontSize: 15,
  },
});
