import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


const colors = {
  background: "#0F0F23",
  cardBackground: "#1A1A2E",
  accent: "#16213E",
  primary: "#E94560",
  secondary: "#F39C12",
  textPrimary: "#FFFFFF",
  textSecondary: "#B8B8D1",
  inputBackground: "#16213E",
  inputBorder: "#E94560",
  success: "#2ECC71",
  error: "#E74C3C",
};

export default function Index() {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push("./auth");
  };

  const handleLogin = () => {
    router.push("./auth");
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.logo}>EventSnap</Text>
        <Text style={styles.slogan}>"Snap Up Your Seats in Seconds!"</Text>
        <Text style={styles.description}>
          Discover amazing events, secure your tickets instantly, and create unforgettable memories.
        </Text>
      </View>

      <View style={styles.actionCard}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.secondaryBtn} onPress={handleLogin}>
          <Text style={styles.secondaryButtonText}>Sign In to Your Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Join thousands of event enthusiasts</Text>
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>✨ Instant booking</Text>
          <Text style={styles.featureText}>🎟️ Secure payments</Text>
          <Text style={styles.featureText}>📱 Mobile tickets</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  heroSection: {
    alignItems: "center",
    paddingTop: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 16,
    letterSpacing: -2,
    textAlign: "center",
  },
  slogan: {
    fontSize: 18,
    fontStyle: "italic",
    color: colors.secondary,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: 32,
    marginVertical: 40,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent,
  },
  dividerText: {
    color: colors.textSecondary,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  secondaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
});