import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

const Header = () => {
  const { user } = useUser();
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 30,
        // backgroundColor : Colors.PRIMARY,
        // paddingVertical : 10,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20
      }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: user?.imageUrl,
          }}
          style={{ width: 60, height: 60, borderRadius: 99 }}
        />
        <View>
          <Text>Welcome</Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "karlaBold",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput style={styles.input} placeholder="Search..." />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    flexDirection : 'row',
    alignItems: 'center',
    padding : 10,
    borderWidth : 1,
    marginVertical : 10,
    borderColor : Colors.GREY,
    borderRadius  :12
  },
  input : {
    flex : 1,
    paddingHorizontal : 6,
    fontFamily : "karlaMedium",
    paddingVertical : 6
  },
});
