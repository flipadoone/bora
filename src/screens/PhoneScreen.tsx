import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { RootStackParamList } from "../navigation/types";

type PhoneScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Phone"
>;

function formatPhone(value: string) {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

  if (onlyNumbers.length <= 2) return onlyNumbers;

  if (onlyNumbers.length <= 7) {
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
  }

  return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(
    2,
    7
  )}-${onlyNumbers.slice(7)}`;
}

function isValidPhone(phone: string) {
  const onlyNumbers = phone.replace(/\D/g, "");
  return onlyNumbers.length === 10 || onlyNumbers.length === 11;
}

export default function PhoneScreen() {
  const navigation = useNavigation<PhoneScreenNavigationProp>();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!isValidPhone(phone)) {
      Alert.alert(
        "Telefone inválido",
        "Digite um telefone com DDD. Exemplo: (61) 99999-9999."
      );
      return;
    }

    const onlyNumbers = phone.replace(/\D/g, "");

    setLoading(true);

    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", onlyNumbers)
      .maybeSingle();

    if (profileError) {
      setLoading(false);
      console.log("Erro ao verificar telefone:", profileError);
      Alert.alert("Erro", "Não foi possível verificar o telefone agora.");
      return;
    }

    const flow = existingProfile ? "login" : "register";

    const { data: session, error: sessionError } = await supabase
      .from("onboarding_sessions")
      .upsert(
        {
          phone: onlyNumbers,
          flow,
          verified: false,
          profile_id: existingProfile?.id ?? null,
        },
        {
          onConflict: "phone",
        }
      )
      .select("id")
      .single();

    setLoading(false);

    if (sessionError || !session) {
      console.log(
        "SESSION ERROR:",
        JSON.stringify(sessionError, null, 2)
      );

      Alert.alert("Erro Supabase", JSON.stringify(sessionError));
      return;
    }

    if (flow === "login") {
      Alert.alert("Código de login enviado", "Use 000000 para login de teste.");
    } else {
      Alert.alert(
        "Código de cadastro enviado",
        "Use 123456 para cadastro de teste."
      );
    }

    navigation.navigate("Code", {
      sessionId: session.id,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Digite seu telefone</Text>

        <Text style={styles.subtitle}>
          Vamos usar seu número para validar sua conta com segurança.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="(61) 99999-9999"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
          maxLength={15}
        />

        <BoraButton
          title={loading ? "VERIFICANDO..." : "CONTINUAR"}
          onPress={handleContinue}
        />
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 18,
    marginBottom: 24,
  },
});