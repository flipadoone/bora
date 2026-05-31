import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import BoraButton from "../components/BoraButton";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const navigation = useNavigation();

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

    navigation.navigate("Home" as never);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização de segurança</Text>

      <Text style={styles.subtitle}>
        O Bora usará sua localização durante viagens para aumentar sua segurança.
      </Text>

      <BoraButton title="PERMITIR LOCALIZAÇÃO" onPress={handleGetLocation} />

      {latitude !== null && longitude !== null && (
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>
          <Text style={styles.locationText}>Longitude: {longitude}</Text>
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