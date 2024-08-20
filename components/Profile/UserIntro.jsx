import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

const UserIntro = () => {
  const { user } = useUser();
  return (
    <View style={styles.introContainer}>
      <Image style={styles.img} source={{ uri: user?.imageUrl }} />
      <Text style={styles.name}>{user?.fullName}</Text>
      <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress}</Text>
    </View>
  );
};

export default UserIntro;

const styles = StyleSheet.create({
  introContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  name: {
    fontFamily: "karlaBold",
    fontSize: 25,
  },
  email: {
    fontFamily: "karlaMedium",
    fontSize: 16,
    color: Colors.GREY,
    paddingVertical: 6,
  },
});
