import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { RootStackParamList } from "../navigation/types";

type LocationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Location"
>;

type LocationRouteProp = RouteProp<RootStackParamList, "Location">;

export default function LocationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LocationNavigationProp>();
  const route = useRoute<LocationRouteProp>();

  const { sessionId } = route.params;

  async function handleGetLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da localização para segurança durante viagens."
      );
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});

    setLatitude(currentLocation.coords.latitude);
    setLongitude(currentLocation.coords.longitude);

    setLoading(true);

    const { error } = await supabase.rpc("finalize_onboarding", {
      p_session_id: sessionId,
    });

    setLoading(false);

    if (error) {
      console.log("Erro ao finalizar cadastro:", error);

      Alert.alert(
        "Erro",
        "Não foi possível finalizar seu cadastro agora."
      );
      return;
    }

    Alert.alert("Sucesso", "Cadastro finalizado com segurança.");

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização de segurança</Text>

      <Text style={styles.subtitle}>
        O Bora usará sua localização durante viagens para aumentar sua
        segurança.
      </Text>

      <BoraButton
        title={loading ? "FINALIZANDO..." : "PERMITIR LOCALIZAÇÃO"}
        onPress={handleGetLocation}
      />

      {latitude !== null && longitude !== null && (
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            Latitude: {latitude}
          </Text>

          <Text style={styles.locationText}>
            Longitude: {longitude}
          </Text>
        </View>
      )}
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
    lineHeight: 24,
    marginBottom: 32,
  },

  locationBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
  },
});