import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";
import { Colors } from "../../constants/Colors";
import Button from "../../components/Button/Button"


const BusinessListByCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [categoryBusinessList, setCategoryBusinessList] = useState([]);
  const { category } = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: category,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: "transparent",
      },
    });
    getBusinessList();
  }, []);
  const getBusinessList = async () => {
    setLoading(true);
    setCategoryBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryBusinessList((prev) => [
        ...prev,
        { id: doc?.id, ...doc.data() },        
      ]);
    });
    setLoading(false);
  };
  const handleAddPress = () => {
    router.navigate("/business/add-business")
  }
  return (
    <View
      style={{
        paddingVertical: 90,
        backgroundColor: Colors.light.background,
        width: "100%",
        flex: 1,
      }}
    >
      {categoryBusinessList.length > 0 && loading == false ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categoryBusinessList}
          refreshing={loading}
          onRefresh={getBusinessList}
          renderItem={({ item, index }) => {
            return <BusinessListCard business={item} />;
          }}
        />
      ) : loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={styles.activity}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.heading}>No Business Added Yet</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/5883/5883605.png",
            }}
            style={styles.img}
            resizeMode="cover"
          />
          <Button title = "Add Your Business" onPress= {()=>handleAddPress()} />

        </View>
      )}
    </View>
  );
};

export default BusinessListByCategory;

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 50,
    fontFamily: "karlaBold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: Colors.GREY,
  },
  img: {
    width: 80,
    height: 80,
    marginVertical: 20,
  },
  activity: {
    marginTop: "60%",
  },
});
