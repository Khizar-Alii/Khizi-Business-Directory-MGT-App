import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";

const Intro = ({ business }) => {
  const [isFav, setIsFav] = useState(false);
  const { user } = useUser();
  const onDelete = () => {
    Alert.alert("Confirmation", "Do you really want to delete Business?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteBusiness(),
      },
    ]);
  };

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", business?.id));
    ToastAndroid.show("Business deleted", ToastAndroid.BOTTOM);
    router.navigate("/(tabs)/Home");
  };
  return (
    <View style={styles.introContainer}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={35}
            color={Colors.iconBackground}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFav(!isFav)}>
          {isFav ? (
            <Ionicons name="heart" size={35} color="red" />
          ) : (
            <Ionicons
              name="heart-outline"
              size={35}
              color={Colors.iconBackground}
            />
          )}
        </TouchableOpacity>
      </View>
      <Image source={{ uri: business.imageUrl }} style={styles.img} />
      <View style={styles.introInfo}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <Text style={styles.name}>{business.name}</Text>
          {user.primaryEmailAddress.emailAddress == business?.userEmail && (
            <TouchableOpacity onPress={() => onDelete()}>
              <Image
                style={{ width: 35, height: 35 }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/3221/3221897.png ",
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.address}>{business.address}</Text>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  headerIcons: {
    position: "absolute",
    padding: 25,
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    width: "100%",
  },
  img: {
    width: "100%",
    height: 400,
  },
  introInfo: {
    marginTop: -20,
    backgroundColor: Colors.iconBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // alignItems: "center",
    padding: 15,
  },
  name: {
    fontFamily: "karlaBold",
    fontSize: 25,
  },
  address: {
    fontFamily: "karlaMedium",
    fontSize: 16,
    color: Colors.GREY,
    paddingVertical: 6,
  },
});
