import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#0F0F23" />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: "#0F0F23" }
        }}
      >
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="auth" options={{ title: "Authentication" }} />
        <Stack.Screen name="home" options={{ title: "Home" }} />
      </Stack>
    </AuthProvider>
  );
}