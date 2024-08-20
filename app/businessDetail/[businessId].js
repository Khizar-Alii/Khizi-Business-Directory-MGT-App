import { ActivityIndicator, StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

const BusinessDetails = () => {
  const { businessId } = useLocalSearchParams();
  const [businessDetails, setBusinessDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBusinessDetailById();
  }, []);
  const getBusinessDetailById = async () => {
    setLoading(true);
    // setBusinessDetails([])
    const docRef = doc(db, "BusinessList", businessId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusinessDetails({id :docSnap.id, ...docSnap.data()});
      setLoading(false);
      //   console.log("Document data : ", docSnap.data());
    } else {
      console.log("NO such Document");
    }
  };
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.activity}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}

          <Intro business={businessDetails} />

          {/* Action Buttons */}

          <ActionButton business={businessDetails} />

          {/* About section */}

          <About business={businessDetails} />

          {/* Review Section */}

          <Reviews business={businessDetails} />
          <View style={{ marginBottom: 20 }} />
        </View>
      )}
    </ScrollView>
  );
};

export default BusinessDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  activity: {
    marginTop: "80%",
  },
});
