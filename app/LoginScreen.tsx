import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Por favor, ingrese todos los campos.");
      return;
    }

    setLoading(true);

    const fetchWithTimeout = (url, options, timeout = 7000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeout)
        ),
      ]);
    };

    fetchWithTimeout("http://192.168.1.70:3000/login", {
      // Cambia '192.168.1.5' a tu dirección IP adecuada.
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.success) {
          navigation.navigate("Home");
        } else {
          Alert.alert("Error de inicio de sesión", "Credenciales inválidas");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Campos incompletos") {
          Alert.alert("Error", "Por favor, ingrese todos los campos.");
        } else if (error.message === "Credenciales inválidas") {
          Alert.alert("Error de inicio de sesión", "Credenciales inválidas");
        } else if (error.message === "Timeout") {
          Alert.alert(
            "Error de Red",
            "La solicitud ha tardado demasiado. Por favor, inténtelo de nuevo."
          );
        } else {
          Alert.alert("Error de Red", error.message);
        }
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/*   <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      /> */}
      <Text style={[styles.title, { color: colors.text }]}>CitasApp</Text>
      <TextInput
        label="Número de teléfono"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
        theme={{
          colors: { text: colors.text, placeholder: colors.placeholder },
        }}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        theme={{
          colors: { text: colors.text, placeholder: colors.placeholder },
        }}
      />
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          buttonColor={colors.primary}
        >
          <Text style={{ color: colors.buttonText }}>Iniciar Sesión</Text>
        </Button>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={[styles.link, { color: colors.linkText }]}>
          ¿Eres nuevo? Regístrate Aquí.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 12,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  link: {
    marginTop: 20,
    textDecorationLine: "underline",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default LoginScreen;
