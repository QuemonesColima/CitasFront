import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ProfileScreen() {
  const route = useRoute();
  const { user } = route.params || {};

  console.log("Parámetros recibidos en ProfileScreen:", user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No se pudo cargar la información del usuario.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre: {user.client_name}</Text>
      <Text style={styles.text}>Teléfono: {user.phone_number}</Text>
      {user.profile_image && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${user.profile_image}` }}
          style={styles.profileImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});
