import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const UserMenu = () => {

  const {signOut} = useAuth()
  
  const actionMenu = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/business-and-trade.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];
  const handlePress = (item) =>{
    if(item.path == "logout"){
      signOut();
      return;
    }
    if(item.id == 1){
      router.navigate("/business/add-business")
      return;
    }
    if(item.path == "share"){
      Share.share({
        message : "Download the Business Directory app by Khizar ALi."
      })
      return;
    }
    router.push(item.path)
  }
  return (
    <View style={styles.actionBtnContainer}>
      <FlatList
        numColumns={2}
        data={actionMenu}
        columnWrapperStyle={{ justifyContent: "center"}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.actionBtnContent}
            onPress={()=>handlePress(item)}
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

export default UserMenu;

const styles = StyleSheet.create({
  actionBtnContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  actionBtnContent: {
    display: "flex",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor : Colors.GREY,
    gap  :10,
    width : wp(40),
    margin : 10,
    padding : 20,
    borderRadius : 10
  },
  btnImg: {
    width: 40,
    height: 40,
    borderRadius : 4    
  },
  btnText: {
    fontSize: 14,
    fontFamily: "karlaMedium",
  },
});