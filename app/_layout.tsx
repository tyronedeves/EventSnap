import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack 
        screenOptions={{ headerShown: false }}
      />
    </AuthProvider>
  );
}