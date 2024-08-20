import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import Button from "../components/Button/Button";
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export const useWarmUpBrowser = () => {
    useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
}
  
WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/(tabs)/Home'),
          })
    
          if (createdSessionId) {
            setActive({ session: createdSessionId })
          } else {
          }
        } catch (err) {
          console.error('OAuth error', err)
        }
    }, [])
  return (
    <View>
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1683402693577-035defb30159?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          width: "100%",
          height: 500,
          borderBottomLeftRadius: 70,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>
          Your Ultimate
          <Text style={{ color: Colors.PRIMARY }}>
            {" "}
            Community Business Directory{" "}
          </Text>
          App
        </Text>
        <Text style={styles.desc}>
          Find your favourite business near and post your own business to your
          Community.
        </Text>
        <Button title="Let's Get Started" onPress={onPress} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  heading: {
    fontSize: 25,
    fontFamily: "karlaBold",
    textAlign: "center",
    marginTop: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    fontFamily: "karlaRegular",
    color: Colors.GREY,
  },
});
