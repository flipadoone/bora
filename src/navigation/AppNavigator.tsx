import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackParamList } from "./types";

import WelcomeScreen from "../screens/WelcomeScreen";
import PhoneScreen from "../screens/PhoneScreen";
import CodeScreen from "../screens/CodeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RoleScreen from "../screens/RoleScreen";
import EmergencyContactScreen from "../screens/EmergencyContactScreen";
import LocationScreen from "../screens/LocationScreen";
import HomeScreen from "../screens/HomeScreen";
import CreateRouteScreen from "../screens/CreateRouteScreen";
import RouteListScreen from "../screens/RouteListScreen";
import DriverRequestsScreen from "../screens/DriverRequestsScreen";

import { getProfileId } from "../services/authStorage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const profileId = await getProfileId();

    if (profileId) {
      setInitialRoute("Home");
      return;
    }

    setInitialRoute("Welcome");
  }

  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando Bora...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Phone" component={PhoneScreen} />
        <Stack.Screen name="Code" component={CodeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Role" component={RoleScreen} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="CreateRoute" component={CreateRouteScreen} />
        <Stack.Screen name="RouteList" component={RouteListScreen} />
        <Stack.Screen name="DriverRequests" component={DriverRequestsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});