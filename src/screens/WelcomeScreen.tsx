import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BoraButton from "../components/BoraButton";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoGlass}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        Mobilidade comunitária segura
      </Text>

      <Text style={styles.subtitle}>
        Conectando moradores do DF a rotas mais rápidas,
        acessíveis e verificadas.
      </Text>

      <BoraButton
        title="BORA"
        onPress={() => {
          navigation.navigate("Phone" as never);
        }}
      />
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

  logoGlass: {
    width: 240,
    height: 240,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.18)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.30)",

    borderRadius: 120,

    marginBottom: 24,
  },

  logo: {
    width: 200,
    height: 200,
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
    marginBottom: 40,
  },
});