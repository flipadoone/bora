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
import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { RootStackParamList } from "../navigation/types";

type CodeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Code"
>;

type CodeScreenRouteProp = RouteProp<
  RootStackParamList,
  "Code"
>;

export default function CodeScreen() {
  const [code, setCode] = useState("");

  const navigation = useNavigation<CodeScreenNavigationProp>();
  const route = useRoute<CodeScreenRouteProp>();

  const { sessionId } = route.params;

  async function handleContinue() {
    const { data: session, error } = await supabase
      .from("onboarding_sessions")
      .select("flow")
      .eq("id", sessionId)
      .single();

    if (error || !session) {
      Alert.alert("Erro", "Sessão inválida. Tente novamente.");
      return;
    }

    if (session.flow === "register" && code === "123456") {
      navigation.navigate("Register", {
        sessionId,
      });
      return;
    }

    if (session.flow === "login" && code === "000000") {
      navigation.navigate("Home");
      return;
    }

    Alert.alert(
      "Código inválido",
      session.flow === "register"
        ? "Use 123456 para cadastro de teste."
        : "Use 000000 para login de teste."
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Digite o código</Text>

        <Text style={styles.subtitle}>
          Digite o código recebido para continuar.
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

        <BoraButton
          title="VALIDAR CÓDIGO"
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
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 6,
    marginBottom: 24,
  },
});