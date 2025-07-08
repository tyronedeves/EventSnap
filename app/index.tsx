import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const { user, isLoading, isLoggedIn, signOut } = useAuth();
  
  const handleGetStarted = () => {
    router.push("./auth");
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      // User is signed out, component will re-render
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If user is logged in, show welcome screen
  if (isLoggedIn && user) {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Welcome to EventSnap!</Text>
        <Text style={styles.welcomeText}>Hello, {user.name}!</Text>
        <Text style={styles.sloganText}>"Your events are just a snap away!"</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.buttonText}>Browse Events</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryButtonText}>My Tickets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // If user is not logged in, show get started screen
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>EventSnap</Text>
      <Text style={styles.sloganText}>"Snap Up Your Seats in Seconds!"</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginPrompt}>Have an account already? </Text>
          <TouchableOpacity onPress={handleGetStarted}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F1E9", 
    padding: 20,
  },
  loadingContainer: {
    gap: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  mainText: {
    color: "#1A1A1A",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeText: {
    color: "#1E90FF",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  sloganText: {
    fontStyle: "italic",
    fontSize: 20,
    color: "#6B7280",
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  loginBtn: {
    backgroundColor: "#1E90FF", 
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
  },
  primaryBtn: {
    backgroundColor: "#1E90FF", 
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
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
  },
  signOutBtn: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#E6ECEF", 
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#1E90FF",
    fontSize: 18,
    fontWeight: "700",
  },
  signOutButtonText: {
    color: "#E74C3C",
    fontSize: 16,
    fontWeight: "600",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginPrompt: {
    fontSize: 16,
    color: "#6B7280", 
  },
  loginLink: {
    fontSize: 16,
    color: "#1E90FF", 
    fontWeight: "600",
  },
});