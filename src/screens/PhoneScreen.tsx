import { View, Text, StyleSheet } from "react-native";

export default function PhoneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu telefone</Text>

      <Text style={styles.subtitle}>
        Vamos usar seu número para validar sua conta com segurança.
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