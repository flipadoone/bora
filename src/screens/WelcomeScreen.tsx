import { View, Text, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BORA DF</Text>

      <Text style={styles.title}>
        Mobilidade comunitária segura
      </Text>

      <Text style={styles.subtitle}>
        Conectando moradores do DF a rotas mais rápidas, acessíveis e verificadas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#22C55E",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 24,
  },
});