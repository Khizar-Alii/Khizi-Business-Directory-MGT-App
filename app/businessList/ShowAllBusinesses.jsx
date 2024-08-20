import { Text, ScrollView, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Colors } from "../../constants/Colors";
import { commonStyles } from "../../styles/CommonStyles";
import ExploreBusinessListCard from "../../components/Explore/ExploreBusinessListCard";
import { useNavigation } from "expo-router";
const ShowAllBusinesses = () => {

  const navigation = useNavigation()

  const [allBusiness, setAllBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown : true,
      headerTitle : "",
      transparent : true,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.light.background, 
        elevation: 0, 
        shadowOpacity: 0, 
        borderWidth : 0
      },

    })
    fetchAllBusinesses();
  }, []);
  const fetchAllBusinesses = async () => {
    setLoading(true);
    setAllBusiness([]);
    const q = query(collection(db, "BusinessList"));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setAllBusiness((prv) => [...prv, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.light.background,
        height: "100%",
        flex : 1,
      }}
    >
      <Text style={commonStyles.homeheading}>All Businesses</Text>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {allBusiness.map((item, index) => {
            return <View key={index}>
              <ExploreBusinessListCard business={item} />
            </View>;
          })}
        </View>
      )}

      <View style={{ marginBottom: 5 }} />
    </ScrollView>
  );
};

export default ShowAllBusinesses;
