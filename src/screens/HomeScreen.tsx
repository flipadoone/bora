import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoraButton from "../components/BoraButton";
import { supabase } from "../services/supabase";
import { clearProfileId, getProfileId } from "../services/authStorage";
import { RootStackParamList } from "../navigation/types";

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Profile = {
  id: string;
  full_name: string;
  role: string;
};

type EmergencyContact = {
  contact_name: string;
  relationship: string;
  verified: boolean;
};

type Stats = {
  profilesCount: number;
  verifiedContactsCount: number;
};

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [emergencyContact, setEmergencyContact] =
    useState<EmergencyContact | null>(null);

  const [stats, setStats] = useState<Stats>({
    profilesCount: 0,
    verifiedContactsCount: 0,
  });

  useEffect(() => {
    loadHomeData();
  }, []);

  async function loadHomeData() {
    const savedProfileId = await getProfileId();

    if (!savedProfileId) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", savedProfileId)
      .single();

    if (profileError || !profileData) {
      console.log("Erro ao carregar perfil:", profileError);
      return;
    }

    setProfile(profileData);

    const { data: contactData, error: contactError } = await supabase
      .from("emergency_contacts")
      .select("contact_name, relationship, verified")
      .eq("profile_id", profileData.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (contactError) {
      console.log("Erro ao carregar contato:", contactError);
    } else {
      setEmergencyContact(contactData);
    }

    const { count: profilesCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: verifiedContactsCount } = await supabase
      .from("emergency_contacts")
      .select("*", { count: "exact", head: true })
      .eq("verified", true);

    setStats({
      profilesCount: profilesCount ?? 0,
      verifiedContactsCount: verifiedContactsCount ?? 0,
    });
  }

  async function handleLogout() {
    await clearProfileId();

    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Bora</Text>

      {profile ? (
        <>
          <View style={styles.card}>
            <Text style={styles.name}>{profile.full_name}</Text>

            <Text style={styles.info}>Perfil: {profile.role}</Text>

            <Text style={styles.subtitle}>
              Sua conta está pronta para usar os recursos de mobilidade
              comunitária.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contato de emergência</Text>

            {emergencyContact ? (
              <>
                <Text style={styles.info}>
                  {emergencyContact.contact_name}
                </Text>

                <Text style={styles.subtitle}>
                  Relação: {emergencyContact.relationship}
                </Text>

                <Text style={styles.success}>
                  {emergencyContact.verified
                    ? "✓ Contato validado"
                    : "Contato ainda não validado"}
                </Text>
              </>
            ) : (
              <Text style={styles.subtitle}>Nenhum contato encontrado.</Text>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Estatísticas Bora</Text>

            <Text style={styles.info}>
              Usuários cadastrados: {stats.profilesCount}
            </Text>

            <Text style={styles.info}>
              Contatos validados: {stats.verifiedContactsCount}
            </Text>
          </View>

          <BoraButton title="SAIR DA CONTA" onPress={handleLogout} />
        </>
      ) : (
        <Text style={styles.subtitle}>Carregando perfil...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  name: {
    color: "#22C55E",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },

  info: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
    textTransform: "capitalize",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 24,
  },

  success: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
});