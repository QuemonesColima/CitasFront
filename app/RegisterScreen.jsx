import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  ActivityIndicator,
  Switch,
  useTheme,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
const RegisterScreen = ({}) => {
  const navigation = useNavigation();

  const { colors } = useTheme();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const base64Image = await FileSystem.readAsStringAsync(
        result.assets[0].uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
      setProfileImage(`data:image/jpeg;base64,${base64Image}`);
    }
  };

  const handleRegister = () => {
    if (!phoneNumber || !password || !clientName || !confirmPassword) {
      Alert.alert("Error", "Por favor, complete todos los campos requeridos.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

    setLoading(true);

    const fetchWithTimeout = (url, options, timeout = 15000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeout)
        ),
      ]);
    };

    fetchWithTimeout("http://192.168.1.70:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
        is_owner: isOwner,
        client_name: clientName,
        profile_image: profileImage,
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
        Alert.alert(
          "Registro exitoso",
          "El usuario ha sido registrado exitosamente"
        );
        navigation.navigate("index");
      })
      .catch((error) => {
        setLoading(false);
        if (error.message === "Campos incompletos") {
          Alert.alert(
            "Error",
            "Por favor, complete todos los campos requeridos."
          );
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
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <KeyboardAvoidingView
          behavior="position"
          style={{ flex: 1, width: "80%" }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={[styles.tituloLabel, { color: colors.linkText }]}>
              A continuación rellene los campos siguientes
            </Text>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.image} />
              ) : (
                <Text style={styles.imagePickerText}>
                  Añadir Foto de Perfil (Opcional)
                </Text>
              )}
            </TouchableOpacity>

            <TextInput
              label="Número de teléfono"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="phone-pad"
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={(text) => {
                if (text.length <= 20) {
                  setPassword(text);
                }
              }}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={(text) => {
                if (text.length <= 20) {
                  setConfirmPassword(text);
                }
              }}
              style={styles.input}
              secureTextEntry
            />
            {!passwordsMatch && (
              <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
            )}
            <TextInput
              label="Nombre"
              value={clientName}
              onChangeText={setClientName}
              style={styles.input}
            />
            <View style={styles.checkboxContainer}>
              <Switch
                value={isOwner ? true : false}
                onValueChange={() => setIsOwner(!isOwner)}
              />
              <Text style={[styles.checkboxLabel, { color: colors.linkText }]}>
                ¿ Usted es dueño de un local?
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Button
                mode="contained"
                onPress={handleRegister}
                buttonColor={colors.primary}
              >
                <Text style={{ color: colors.buttonText }}>Registrarse</Text>
              </Button>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tituloLabel: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    marginBottom: 12,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    width: "100%",
  },
  imagePicker: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 75,
    marginBottom: 12,
    overflow: "hidden",
  },
  imagePickerText: {
    color: "#999",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

export default RegisterScreen;
