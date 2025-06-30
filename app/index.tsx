import { Link, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function Index() {


  const router = useRouter();
  const handlePress = () => {

  }
  return (
   
    <View style={styles.container}>
      <Text style={styles.mainText}>EventSnap</Text>
      <Text style={styles.sloganText}>"Snap Up Your Seats in Seconds!"</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.buttonText}>Get Started!</Text>
        </TouchableOpacity>
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginPrompt}>Have an account already? </Text>
          <Link href="/" style={styles.loginLink}>Login</Link>
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
  mainText: {
    color: "#1A1A1A", // Deep Charcoal
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sloganText: {
    fontStyle: "italic",
    fontSize: 20,
    color: "#6B7280", // Slate Gray
    marginBottom: 50,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
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
  buttonText: {
    color: "#E6ECEF", 
    fontSize: 18,
    fontWeight: "700",
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