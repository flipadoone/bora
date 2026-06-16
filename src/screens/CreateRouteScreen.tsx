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
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { getProfileId } from "../services/authStorage";

export default function CreateRouteScreen() {
  const navigation = useNavigation();

  const [destination, setDestination] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateRoute() {
    if (!destination || !availableSeats) {
      Alert.alert("Atenção", "Preencha destino e vagas.");
      return;
    }

    const seats = Number(availableSeats);

    if (!seats || seats < 1) {
      Alert.alert("Vagas inválidas", "Digite pelo menos 1 vaga.");
      return;
    }

    const profileId = await getProfileId();

    if (!profileId) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da localização para criar sua rota."
      );
      return;
    }

    setLoading(true);

    const currentLocation = await Location.getCurrentPositionAsync({});

    const latitude = currentLocation.coords.latitude;
    const longitude = currentLocation.coords.longitude;

    const { error } = await supabase.from("routes").insert({
      driver_id: profileId,
      origin: "Localização atual do motorista",
      destination: destination.trim(),
      available_seats: seats,
      status: "active",
      origin_latitude: latitude,
      origin_longitude: longitude,
      notes: notes.trim() || null,
    });

    setLoading(false);

    if (error) {
      console.log("Erro ao criar rota:", error);

      Alert.alert(
        "Erro",
        "Não foi possível criar a rota agora."
      );

      return;
    }

    Alert.alert("Sucesso", "Rota ativa criada com sucesso.");

    navigation.navigate("Home" as never);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar rota ativa</Text>

        <Text style={styles.subtitle}>
          Sua localização atual será usada como ponto de origem.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Destino"
          placeholderTextColor="#94A3B8"
          value={destination}
          onChangeText={setDestination}
        />

        <TextInput
          style={styles.input}
          placeholder="Vagas disponíveis"
          placeholderTextColor="#94A3B8"
          keyboardType="number-pad"
          value={availableSeats}
          onChangeText={setAvailableSeats}
        />

        <TextInput
          style={styles.input}
          placeholder="Observações opcional"
          placeholderTextColor="#94A3B8"
          value={notes}
          onChangeText={setNotes}
        />

        <BoraButton
          title={loading ? "CRIANDO..." : "CRIAR ROTA ATIVA"}
          onPress={handleCreateRoute}
        />
      </View>
    </TouchableWithoutFeedback>
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