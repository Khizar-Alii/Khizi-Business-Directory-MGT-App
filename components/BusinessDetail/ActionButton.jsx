import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  FlatList,
  Share,
} from "react-native";
import React from "react";

const ActionButton = ({ business }) => {
  const handlePress = (item) => {
    if (item.name === "Share") {
      Share.share({
        message:
          business?.name +
          "\nAddresses: " +
          business?.address +
          "\nFind more details on KhiZi Bussiness!",
      });
      return;
    }

    let url = item.url;

    // Encode the URL to ensure it's properly formatted
    url = encodeURI(url);

    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const actionButtonMenu = [
    {
      name: "Call",
      id: 1,
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business.contact,
    },
    {
      name: "Location",
      id: 2,
      icon: require("../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      name: "Web",
      id: 3,
      icon: require("../../assets/images/web.png"),
      url: business?.website,
    },
    {
      name: "Share",
      id: 4,
      icon: require("../../assets/images/share.png"),
      url: "tel:" + business.contact,
    },
  ];

  return (
    <View style={styles.actionBtnContainer}>
      <FlatList
        numColumns={4}
        data={actionButtonMenu}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.actionBtnContent}
            onPress={() => handlePress(item)}
          >
            <Image source={item.icon} style={styles.btnImg} />
            <Text style={styles.btnText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionBtnContainer: {
    padding: 20,
    alignItems: "center",
  },
  actionBtnContent: {
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  btnImg: {
    width: 40,
    height: 40,
  },
  btnText: {
    fontSize: 12,
    fontFamily: "karlaMedium",
    paddingTop: 4,
  },
});