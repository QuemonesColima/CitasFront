import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { lightColors, darkColors } from "@/constants/Theme";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "LoginScreen",
};
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

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

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={{
        bottom: Platform.OS === "ios" ? "off" : undefined,
        top: "additive",
      }}
    >
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="RegisterScreen"
            options={{
              headerShown: true,
              title: "Registro nuevo",
              headerBackTitle: "Inicio",
            }}
          />
          <Stack.Screen name="Home" options={{ headerShown: true }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
        </Stack>
      </PaperProvider>
    </SafeAreaView>
  );
}
