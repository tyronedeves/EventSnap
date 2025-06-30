import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign up

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"} to EventSnap</Text>
      <Text style={styles.subtitle}>
        {isLogin ? "Sign in to access your tickets" : "Create an account to get started"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.authBtn}>
        <Text style={styles.buttonText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background, // #F8F1E9
    padding: 20,
  },
  title: {
    color: colors.textPrimary, // #1A1A1A
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: colors.textSecondary, // #6B7280
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "85%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.textSecondary, // #6B7280
    color: colors.textPrimary,
    backgroundColor: "#FFFFFF",
  },
  authBtn: {
    backgroundColor: colors.primary, // #1E90FF
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: colors.background, // #F8F1E9
    fontSize: 18,
    fontWeight: "700",
  },
  toggleText: {
    color: colors.secondary, // #C71585
    fontSize: 16,
    fontWeight: "600",
  },
});