import { View, Text } from "react-native";
import React from "react";
import { commonStyles } from "../../styles/CommonStyles";
import UserIntro from "../../components/Profile/UserIntro";
import { Colors } from "../../constants/Colors";
import UserMenu from "../../components/Profile/UserMenu";
const Profile = () => {
  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: Colors.light.background,
        height: "100%",
        flex: 1,
      }}
    >
      <Text style={commonStyles.homeheading}>Profile</Text>
      {/* User Intro */}
      <UserIntro />
      {/* User Menu */}
      <UserMenu />
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 40,
          color: Colors.GREY,
          fontFamily: "karlaBold",
        }}
      >
        Developed By Khizar Ali @ 2024
      </Text>
    </View>
  );
};

export default Profile;
