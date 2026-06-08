import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { RootStackParamList } from "../navigation/types";

type RoleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Role"
>;

type RoleScreenRouteProp = RouteProp<RootStackParamList, "Role">;

export default function RoleScreen() {
  const navigation = useNavigation<RoleScreenNavigationProp>();
  const route = useRoute<RoleScreenRouteProp>();

  const { sessionId } = route.params;

  async function handleChooseRole(role: "passageiro" | "motorista") {
    const { error } = await supabase
      .from("onboarding_sessions")
      .update({
        role,
      })
      .eq("id", sessionId);

    if (error) {
      console.log("Erro ao salvar perfil:", error);

      Alert.alert(
        "Erro",
        "Não foi possível salvar seu perfil agora."
      );

      return;
    }

    navigation.navigate("EmergencyContact", {
      sessionId,
    });
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
          onPress={() => handleChooseRole("passageiro")}
        />

        <View style={styles.spacing} />

        <BoraButton
          title="🚗 MOTORISTA"
          onPress={() => handleChooseRole("motorista")}
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