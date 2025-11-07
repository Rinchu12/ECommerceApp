import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useLanguage } from "../src/context/LanguageContext";
import { LocalizedStrings } from "../src/localization/LocalizedStrings";

export default function TabLayout() {
  const { language } = useLanguage(); // triggers re-render on language change

  return (
    <Tabs
      key={language}
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={() => ({
          title: LocalizedStrings.HOME,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" size={28} color={color} />
          ),
        })}
      />
      <Tabs.Screen
        name="cart"
        options={() => ({
          title: LocalizedStrings.CART,
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={28} color={color} />
          ),
        })}
      />
    </Tabs>
  );
}
