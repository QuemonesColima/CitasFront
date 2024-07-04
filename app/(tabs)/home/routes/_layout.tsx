import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const routes = [
    { name: "cuidado-personal/index", title: "Cuidado Personal" },
    { name: "salud/index", title: "Salud" },
    { name: "servicios-prof/index", title: "Servicios Profesionales" },
    { name: "educacion/index", title: "Educación" },
    { name: "automotriz/index", title: "Automotriz" },
    { name: "automotriz/[id]/index", title: "Detalles del Producto" },
    { name: "hogar/index", title: "Hogar" },
    { name: "tecnologia/index", title: "Tecnología" },
    { name: "mascotas/index", title: "Mascotas" },
    { name: "fitness/index", title: "Fitness" },
    { name: "eventos/index", title: "Eventos" },
  ];

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      {routes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          options={{
            title: route.title,
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  );
}
