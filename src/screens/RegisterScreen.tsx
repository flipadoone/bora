import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";

import BoraButton from "../components/BoraButton";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");

  function handleContinue() {
    if (!fullName || !cpf || !birthDate) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    Alert.alert("Cadastro", "Dados preenchidos com sucesso.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar sua conta</Text>

      <Text style={styles.subtitle}>
        Precisamos de alguns dados para manter a comunidade segura.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#94A3B8"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#94A3B8"
        keyboardType="number-pad"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento"
        placeholderTextColor="#94A3B8"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <BoraButton title="BORA" onPress={handleContinue} />
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
    paddingVertical: 16,
    paddingHorizontal: 22,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
  },
});