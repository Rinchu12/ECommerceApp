import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { LanguageProvider } from "./src/context/LanguageContext";
import { CartProvider } from "./src/context/CartContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {

  return (
      <LanguageProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </CartProvider>
      </LanguageProvider>
  );
}
