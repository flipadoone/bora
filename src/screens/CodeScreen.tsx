import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BoraButton from "../components/BoraButton";

export default function CodeScreen() {
  const [code, setCode] = useState("");
  const navigation = useNavigation();

  function handleContinue() {
    if (code === "123456") {
      navigation.navigate("Register" as never);
      return;
    }

    Alert.alert("Erro", "Código inválido. Use 123456 para teste.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite o código</Text>

      <Text style={styles.subtitle}>
        Enviamos um código de teste para seu telefone.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="123456"
        placeholderTextColor="#94A3B8"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        maxLength={6}
      />

      <BoraButton title="VALIDAR CÓDIGO" onPress={handleContinue} />
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
    marginBottom: 32,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 999,
    paddingVertical: 18,
    paddingHorizontal: 22,
    color: "#FFFFFF",
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 24,
  },
});