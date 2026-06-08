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
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { RootStackParamList } from "../navigation/types";

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

type RegisterScreenRouteProp = RouteProp<RootStackParamList, "Register">;

function isValidCpf(cpf: string) {
  const onlyNumbers = cpf.replace(/\D/g, "");

  if (onlyNumbers.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(onlyNumbers)) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(onlyNumbers[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;

  if (firstDigit !== Number(onlyNumbers[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(onlyNumbers[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;

  return secondDigit === Number(onlyNumbers[10]);
}

function isValidBirthDate(birthDate: string) {
  const onlyNumbers = birthDate.replace(/\D/g, "");

  if (onlyNumbers.length !== 8) return false;

  const day = Number(onlyNumbers.slice(0, 2));
  const month = Number(onlyNumbers.slice(2, 4));
  const year = Number(onlyNumbers.slice(4, 8));

  const birth = new Date(year, month - 1, day);

  if (
    birth.getDate() !== day ||
    birth.getMonth() !== month - 1 ||
    birth.getFullYear() !== year
  ) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hasBirthdayPassed) age--;

  return age >= 18;
}

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();

  const { sessionId } = route.params;

  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!fullName || !cpf || !birthDate) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (fullName.trim().split(" ").length < 2) {
      Alert.alert("Nome incompleto", "Digite seu nome e sobrenome.");
      return;
    }

    const cleanCpf = cpf.replace(/\D/g, "");
    const cleanBirthDate = birthDate.replace(/\D/g, "");

    if (!isValidCpf(cleanCpf)) {
      Alert.alert("CPF inválido", "Digite um CPF válido com 11 números.");
      return;
    }

    if (!isValidBirthDate(cleanBirthDate)) {
      Alert.alert(
        "Data inválida",
        "Digite uma data válida. Você precisa ter pelo menos 18 anos."
      );
      return;
    }

    setLoading(true);

    const { data: existingCpf, error: cpfError } = await supabase
      .from("profiles")
      .select("id")
      .eq("cpf", cleanCpf)
      .maybeSingle();

    if (cpfError) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível verificar o CPF agora.");
      return;
    }

    if (existingCpf) {
      setLoading(false);
      Alert.alert(
        "CPF já cadastrado",
        "Este CPF já está vinculado a uma conta. Verifique seus dados ou tente fazer login."
      );
      return;
    }

    const { error } = await supabase
      .from("onboarding_sessions")
      .update({
        full_name: fullName.trim(),
        cpf: cleanCpf,
        birth_date: cleanBirthDate,
      })
      .eq("id", sessionId);

    setLoading(false);

    if (error) {
      console.log("Erro ao salvar dados do cadastro:", error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar seus dados agora."
      );
      return;
    }

    navigation.navigate("Role", {
      sessionId,
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar sua conta</Text>

        <Text style={styles.subtitle}>
          Precisamos desses dados para manter a comunidade segura.
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
          placeholder="CPF (somente números)"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={cpf}
          onChangeText={setCpf}
          maxLength={11}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de nascimento (DDMMAAAA)"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={birthDate}
          onChangeText={setBirthDate}
          maxLength={8}
        />

        <BoraButton
          title={loading ? "SALVANDO..." : "CONTINUAR"}
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
    paddingVertical: 16,
    paddingHorizontal: 22,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
  },
});