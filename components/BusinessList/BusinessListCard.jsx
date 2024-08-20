import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

const BusinessListCard = ({ business }) => {
  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => router.push("/businessDetail/" + business?.id)}
    >
      <Image source={{ uri: business?.imageUrl }} style={styles.img} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.address}>{business?.address}</Text>
        <View style={styles.rating}>
          <Image
            source={require("../../assets/images/star.png")}
            style={styles.ratingImg}
          />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListCard;
const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.iconBackground,
    padding: 20,
    margin: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    fontFamily: "karlaBold",
    fontSize: 16,
  },
  address: {
    fontFamily: "karlaMedium",
    fontSize: 14,
    color: Colors.GREY,
    paddingVertical: 6,
  },
  rating: {
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingImg: {
    width: 15,
    height: 15,
  },
  ratingText: {
    fontFamily: "karlaMedium",
    fontSize: 12,
  },
});
