import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function LoginLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{
          headerShown: true,
          title: "Registrar Usuario",
        }}
      />
    </Stack>
  );
}
