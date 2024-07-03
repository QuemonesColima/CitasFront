// home/routes/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function MainLayout() {
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
        name="cuidado-personal/index"
        options={{
          title: "Cuidado Personal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="salud/index"
        options={{
          title: "Salud",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="servicios-prof/index"
        options={{
          title: "Servicios Profesionales",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="educacion/index"
        options={{
          title: "Educación",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="automotriz/index"
        options={{
          title: "Automotriz",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="automotriz/[id]/index"
        options={{
          title: "Detalles del Producto",
          headerShown: false, // Cambia esto a false para ocultar el header
        }}
      />
      <Stack.Screen
        name="hogar/index"
        options={{
          title: "Hogar",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tecnologia/index"
        options={{
          title: "Tecnología",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="mascotas/index"
        options={{
          title: "Mascotas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fitness/index"
        options={{
          title: "Fitness",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="eventos/index"
        options={{
          title: "Eventos",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
