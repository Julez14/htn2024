import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ScanInfoScreen from "./screens/ScanInfoScreen";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FA824C",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan Info" component={ScanInfoScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
