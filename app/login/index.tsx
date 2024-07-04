import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, View } from "@/components/Themed";
import {
  TextInput,
  Button,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "expo-router";
import { LoginResponse, FetchOptions } from "../types/loginTypes";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useTheme();

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert("Error", "Por favor, ingrese todos los campos.");
      return;
    }

    setLoading(true);

    const fetchWithTimeout = (
      url: string,
      options: FetchOptions,
      timeout = 7000
    ): Promise<Response> => {
      return Promise.race([
        fetch(url, options),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeout)
        ),
      ]);
    };

    fetchWithTimeout("http://192.168.1.66:3000/login", {
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
          return response.json().then((err: { error: string }) => {
            throw new Error(err.error);
          });
        }
        return response.json() as Promise<LoginResponse>;
      })
      .then((data: LoginResponse) => {
        setLoading(false);
        if (data.success) {
          const userString = JSON.stringify(data);
          console.log("USUARIO", data);
          navigation.navigate("(tabs)", { user: userString });
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" style={{ width: "80%" }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>CitasApp</Text>
            <TextInput
              label="Número de teléfono"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="phone-pad"
              mode="outlined"
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
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
                <Text style={{ color: "white" }}>Iniciar Sesión</Text>
              </Button>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.link}>¿Eres nuevo? Regístrate Aquí.</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    marginTop: 24,
  },
  link: {
    marginTop: 24,
    textDecorationLine: "underline",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
});

export default LoginScreen;
