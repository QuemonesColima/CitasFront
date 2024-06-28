/* import { View, Text } from "@/components/Themed";

export default function MessageScreen() {
  return (
    <View>
      <Text>Mensajes Screen</Text>
    </View>
  );
} */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "expo-router";

const chats = [
  {
    id: "1",
    name: "Mi Hermosa",
    message: "Foto",
    time: "10:54 a.m.",
    profileImage: "",
  },
  {
    id: "2",
    name: "Tercer tiempo",
    message: "Ray Gonzalez: Ya no voy a tomar con ustedes, que ...",
    time: "10:03 a.m.",
    profileImage: "",
  },
  {
    id: "3",
    name: "Shikimoto Honda FC",
    message: "MEMO BAYARDO: Animo",
    time: "10:02 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    name: "Junior",
    message: "A ese vato cambiale las historias de tamal y queda...",
    time: "9:55 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    name: "Biseck",
    message: "El sabado 6 si?",
    time: "9:34 a.m.",
    profileImage: "",
  },
  {
    id: "6",
    name: "Ramon Peralta",
    message: "Dónde venden",
    time: "8:54 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: "1",
    name: "Mi Hermosa",
    message: "Foto",
    time: "10:54 a.m.",
    profileImage: "",
  },
  {
    id: "2",
    name: "Tercer tiempo",
    message: "Ray Gonzalez: Ya no voy a tomar con ustedes, que ...",
    time: "10:03 a.m.",
    profileImage: "",
  },
  {
    id: "3",
    name: "Shikimoto Honda FC",
    message: "MEMO BAYARDO: Animo",
    time: "10:02 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: "4",
    name: "Junior",
    message: "A ese vato cambiale las historias de tamal y queda...",
    time: "9:55 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
  {
    id: "5",
    name: "Biseck",
    message: "El sabado 6 si?",
    time: "9:34 a.m.",
    profileImage: "",
  },
  {
    id: "6",
    name: "Ramon Peralta",
    message: "Dónde venden",
    time: "8:54 a.m.",
    profileImage: "https://via.placeholder.com/50",
  },
];

export default function MessageScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { chatId: item.id })}
    >
      {item.profileImage ? (
        <Image
          source={{ uri: item.profileImage }}
          style={styles.profileImage}
        />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
    justifyContent: "center",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatTime: {
    fontSize: 12,
    color: "#888",
  },
  chatMessage: {
    fontSize: 14,
    color: "#888",
  },
});
