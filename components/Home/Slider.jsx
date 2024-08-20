import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import { query, collection, getDocs } from "firebase/firestore";
import { commonStyles } from "../../styles/CommonStyles";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSLiderList();
  }, []);

  const getSLiderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      setSliderList((prev) => [...prev, doc.data()])
    );
  };
  return (
    <View>
      <Text style={commonStyles.homeheading}>#Special For You</Text>
      <FlatList
        style={{ paddingLeft: 15 }}
        data={sliderList}
        horizontal={true}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.image}
            />
          );
        }}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
    borderRadius: 20,
    marginRight: 15,
  },
});
