import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { supabase } from "../services/supabase";

type Route = {
  id: string;
  destination: string;
  available_seats: number;
  created_at: string;
};

export default function RouteListScreen() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    loadRoutes();
  }, []);

  async function loadRoutes() {
    const { data, error } = await supabase
      .from("routes")
      .select(
        `
        id,
        destination,
        available_seats,
        created_at
      `
      )
      .eq("status", "active")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("Erro ao carregar rotas:", error);
      return;
    }

    setRoutes(data || []);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rotas ativas</Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.destination}>
              {item.destination}
            </Text>

            <Text style={styles.info}>
              Vagas: {item.available_seats}
            </Text>

            <Text style={styles.date}>
              {new Date(
                item.created_at
              ).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhuma rota ativa encontrada.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },

  destination: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
  },

  date: {
    color: "#94A3B8",
    fontSize: 12,
  },

  empty: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 40,
  },
});