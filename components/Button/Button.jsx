import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";

const Button = (props) => {

  return (
    <View style={{alignItems:'center'}}>
      <TouchableOpacity style={styles.btnContainre} onPress={props.onPress}>
        <Text style={styles.btnText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainre: {
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    padding: 15,
    width: wp("60%"),
    borderRadius: 14
  },
  btnText: {
    fontSize: 16,
    fontFamily: "karlaBold",
    color : Colors.dark.text
  },
});
