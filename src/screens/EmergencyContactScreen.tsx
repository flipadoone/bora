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

import BoraButton from "../components/BoraButton";

function formatPhone(value: string) {
  const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

  if (onlyNumbers.length <= 2) {
    return onlyNumbers;
  }

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

export default function EmergencyContactScreen() {
  const navigation = useNavigation();

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  function validateContactData() {
    if (!contactName || !contactPhone || !relationship) {
      Alert.alert("Atenção", "Preencha os dados do contato primeiro.");
      return false;
    }

    if (contactName.trim().split(" ").length < 2) {
      Alert.alert("Nome incompleto", "Digite nome e sobrenome do contato.");
      return false;
    }

    if (!isValidPhone(contactPhone)) {
      Alert.alert(
        "Telefone inválido",
        "Digite um telefone com DDD. Exemplo: (61) 99999-9999."
      );
      return false;
    }

    return true;
  }

  function handleSendCode() {
    const isValid = validateContactData();

    if (!isValid) {
      return;
    }

    Alert.alert("Código enviado", "Use 654321 para teste.");

    setCodeSent(true);
  }

  function handleValidateCode() {
    if (!verificationCode) {
      Alert.alert("Atenção", "Digite o código de verificação.");
      return;
    }

    if (verificationCode !== "654321") {
      Alert.alert("Código inválido", "Use 654321 para teste.");
      return;
    }

    navigation.navigate("Location" as never);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Contato de emergência</Text>

        <Text style={styles.subtitle}>
          Essa pessoa poderá receber sua localização durante viagens.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo do contato"
          placeholderTextColor="#94A3B8"
          value={contactName}
          onChangeText={setContactName}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone com DDD"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          value={contactPhone}
          onChangeText={(text) => {
            setContactPhone(formatPhone(text));
          }}
          maxLength={15}
        />

        <TextInput
          style={styles.input}
          placeholder="Parentesco ou relação"
          placeholderTextColor="#94A3B8"
          value={relationship}
          onChangeText={setRelationship}
        />

        <BoraButton title="ENVIAR CÓDIGO" onPress={handleSendCode} />

        {codeSent && (
          <>
            <TextInput
              style={styles.codeInput}
              placeholder="Código de verificação"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              value={verificationCode}
              onChangeText={setVerificationCode}
              maxLength={6}
            />

            <BoraButton
              title="VALIDAR CÓDIGO"
              onPress={handleValidateCode}
            />
          </>
        )}
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

  codeInput: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.6)",
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 22,
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 4,
    marginTop: 16,
    marginBottom: 16,
  },
});