import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGlobalSearchParams } from "expo-router";

const ChatScreen = () => {
  const route = useGlobalSearchParams();
  const { chatId } = route.chatId;

  // Aquí puedes cargar los mensajes del chat utilizando el chatId

  return (
    <View style={styles.container}>
      <Text style={styles.chatText}>Chat ID: {chatId}</Text>
      {/* Aquí puedes renderizar los mensajes del chat */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatText: {
    fontSize: 18,
  },
});

export default ChatScreen;
