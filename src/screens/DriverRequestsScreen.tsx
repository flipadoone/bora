import { View, Text, StyleSheet } from "react-native";

export default function DriverRequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Solicitações recebidas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
});