import React from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { darkColors, lightColors } from "@/constants/Theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useGlobalSearchParams } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const glob = useGlobalSearchParams();

  let themeToApply = MD3LightTheme;
  let colorsToApply = lightColors;

  if (colorScheme === "dark") {
    themeToApply = MD3DarkTheme;
    colorsToApply = darkColors;
  }

  const theme = {
    ...themeToApply,
    colors: {
      ...colorsToApply.colors,
    },
  };
  console.log("Parámetros recibidos en TabLayout:", glob);
  //console.log("Parámetros recibidos en TabLayout:", everything);

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: colorsToApply.colors.background },
          tabBarActiveTintColor: colorsToApply.colors.primary,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
          // initialParams={{ user }}
        />

        <Tabs.Screen
          name="messages"
          options={{
            title: "Mensajes",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            ),
          }}
          //initialParams={{ user }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
          }}
          initialParams={glob}
        />
      </Tabs>
    </PaperProvider>
  );
}
