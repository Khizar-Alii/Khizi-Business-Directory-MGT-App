import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { commonStyles } from "../../styles/CommonStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";
import { router } from "expo-router";
import Button from "../../components/Button/Button"

const Explore = () => {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBusiness, setAllBusiness] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchAllBusinesses();
  }, []);

  const fetchAllBusinesses = async () => {
    setLoading(true);
    setAllBusiness([]);
    const q = query(collection(db, "BusinessList"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setAllBusiness((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  const getBusinessByCategory = async (category) => {
    setCategory(category);
    setAllBusiness([]);
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  const handleAddPress = () => {
    router.navigate("/business/add-business")
  }
  return (
    <View style={styles.exploreContainer}>
      <TouchableOpacity
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
        onPress={() => router.back()}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/5720/5720446.png",
          }}
        />
      </TouchableOpacity>
      <Text style={commonStyles.homeheading}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput style={styles.input} placeholder="Search..." />
      </View>
      {/* Categories */}
      <View style={{ paddingVertical: 20 }}>
        <Category
          explore={true}
          onCategorySelect={(category) => getBusinessByCategory(category)}
        />
      </View>
      {/* Business List */}
      {loading ? (
        <ActivityIndicator
          style={styles.activity}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : businessList.length > 0 ? (
        <ExploreBusinessList businessList={businessList} />
      ) : allBusiness.length > 0 ? (
        <ExploreBusinessList businessList={allBusiness} />
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

export default Explore;

const styles = StyleSheet.create({
  exploreContainer: {
    paddingTop: 20,
    backgroundColor: Colors.light.background,
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    marginHorizontal: 15,
    borderColor: Colors.GREY,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 6,
    fontFamily: "karlaMedium",
    paddingVertical: 6,
  },
  activity: {
    marginTop: "40%",
  },
  noBusinessText: {
    textAlign: "center",
    fontFamily: "karlaBold",
    fontSize: 16,
    color: Colors.GREY,
    marginTop: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 30,
    fontFamily: "karlaBold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: Colors.GREY,
  },
  img: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
