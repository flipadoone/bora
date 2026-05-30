import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CodeScreen from "../screens/CodeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PhoneScreen from "../screens/PhoneScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Welcome" component={WelcomeScreen} />
  <Stack.Screen name="Phone" component={PhoneScreen} />
  <Stack.Screen name="Code" component={CodeScreen} />
  <Stack.Screen name="Register" component={RegisterScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>
    </NavigationContainer>
  );
}