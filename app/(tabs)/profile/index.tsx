import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const glob = useGlobalSearchParams();

  let user;
  try {
    const userString = glob.user;
    user = JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    user = null;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No se pudo cargar la información del usuario.
        </Text>
      </View>
    );
  }

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {user.profile_image ? (
          <Image
            source={{
              uri: `http://192.168.1.70:3000/uploads/${user.profile_image}`,
            }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitial(user.client_name)}
            </Text>
          </View>
        )}
        <TouchableOpacity>
          <Text style={styles.editText}>Editar imagen de perfil...</Text>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{user.client_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Usuario</Text>
            <Text style={styles.infoValue}>Mavalos</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Correo</Text>
            <Text style={styles.infoValue}>Correodeprueba@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Teléfono*</Text>
            <Text style={styles.infoValue}>{user.phone_number}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Al hacer clic en editar, aceptas nuestros Términos de Servicio y
        Política de Privacidad
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  editText: {
    color: "#007bff",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoValue: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    color: "#666",
    fontSize: 12,
    marginBottom: 10,
  },
});
