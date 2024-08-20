import { FlatList, TouchableOpacity, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import BusinessListItem from "./BusinessListItem";
import { commonStyles } from "../../styles/CommonStyles";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

export default function BusinessList() {
  const [businessItem, setBusinessItem] = useState([]);
  useEffect(() => {
    getBusinessData();
  }, []);
  const getBusinessData = async () => {
    setBusinessItem([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshots = await getDocs(q);
    querySnapshots.forEach((docs) => {
      setBusinessItem((prev) => [...prev, { id: docs.id, ...docs.data() }]);
    });
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={commonStyles.homeheading}>Popular Business</Text>
        <TouchableOpacity
        onPress={()=>router.push("/businessList/ShowAllBusinesses")}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: Colors.PRIMARY,
              fontFamily: "karlaMedium",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 15 }}
        data={businessItem}
        renderItem={({ item, index }) => {
          return <BusinessListItem business={item} />;
        }}
      />
    </View>
  );
}
