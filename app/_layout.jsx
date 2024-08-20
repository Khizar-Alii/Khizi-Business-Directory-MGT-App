import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from "expo-status-bar";


const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
  const [fontsLoaded, fontsError] = useFonts({
    karlaLight: require("../assets/fonts/Karla-Light.ttf"),
    karlaRegular: require("../assets/fonts/Karla-Regular.ttf"),
    karlaMedium: require("../assets/fonts/Karla-Medium.ttf"),
    karlaSemiBold: require("../assets/fonts/Karla-SemiBold.ttf"),
    karlaBold: require("../assets/fonts/Karla-Bold.ttf"),
  });
  if (!fontsLoaded && !fontsError) {
    return;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SignedIn>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
