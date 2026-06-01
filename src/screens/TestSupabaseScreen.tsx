import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";

export default function TestSupabaseScreen() {
  const [loading, setLoading] = useState(false);

  async function handleSaveTestProfile() {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .insert({
        full_name: "Teste Bora",
        cpf: "12345678909",
        birth_date: "01011990",
        role: "passageiro",
        phone: "61999999999",
      })
      .select();

    setLoading(false);

    if (error) {
      console.log("Erro Supabase:", error);
      Alert.alert("Erro", error.message);
      return;
    }

    console.log("Perfil salvo:", data);
    Alert.alert("Sucesso", "Perfil teste salvo no Supabase.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase conectado 🚀</Text>

      <Text style={styles.subtitle}>
        Agora vamos testar se o Bora consegue salvar dados no banco.
      </Text>

      <BoraButton
        title={loading ? "SALVANDO..." : "SALVAR PERFIL TESTE"}
        onPress={handleSaveTestProfile}
      />
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
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  subtitle: {
    color: "#CBD5E1",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
});