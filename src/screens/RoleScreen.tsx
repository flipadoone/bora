import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BoraButton from "../components/BoraButton";

export default function RoleScreen() {
  const navigation = useNavigation();

  function handlePassenger() {
    navigation.navigate("EmergencyContact" as never);
  }

  function handleDriver() {
    navigation.navigate("EmergencyContact" as never);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Como você deseja usar o Bora?
      </Text>

      <Text style={styles.subtitle}>
        Escolha seu perfil inicial.
      </Text>

      <View style={styles.buttons}>
        <BoraButton
          title="🚶 PASSAGEIRO"
          onPress={handlePassenger}
        />

        <View style={styles.spacing} />

        <BoraButton
          title="🚗 MOTORISTA"
          onPress={handleDriver}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
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
    marginBottom: 40,
  },

  buttons: {
    width: "100%",
  },

  spacing: {
    height: 16,
  },
});