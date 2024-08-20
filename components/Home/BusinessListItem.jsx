import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

const BusinessListItem = ({ business }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push("/businessDetail/" + business?.id)}
    >
      <View style={styles.content}>
        <Image
          source={{
            uri: business?.imageUrl,
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{business.name}</Text>
          <Text style={styles.address}>{business.address}</Text>
          <View style={styles.ratingCategoryContainer}>
            <View style={styles.rating}>
              <Image
                source={require("../../assets/images/star.png")}
                style={styles.ratingImg}
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
            <Text style={styles.category}>{business.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: Colors.iconBackground,
  },
  content: {
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  image: {
    width: 230,
    height: 170,
    borderRadius: 15,
  },
  infoContainer: {
    marginTop: 15,
    gap: 5,
  },
  name: {
    fontFamily: "karlaBold",
    fontSize: 16,
    textAlign: "center",
  },
  address: {
    fontFamily: "karlaMedium",
    fontSize: 14,
    textAlign: "center",
    color: Colors.GREY,
    paddingVertical: 6,
  },
  ratingCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  category: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    color: Colors.dark.text,
  },
});
