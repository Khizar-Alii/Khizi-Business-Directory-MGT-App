import { FlatList, TouchableOpacity, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { commonStyles } from "../../styles/CommonStyles";
import CategoryItem from "./CategoryItem";
import { Colors } from "../../constants/Colors";
import { router } from "expo-router";

const Category = ({ explore = false, onCategorySelect }) => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    setCategoryItem([]);
    const q = query(collection(db, "Category"));
    const querySnapshots = await getDocs(q);
    querySnapshots.forEach((docs) => {
      setCategoryItem((prev) => [...prev, docs.data()]);
    });
  };

  const onCategoryPressHandler = (item) => {
    setSelectedCategory(item.name);
    if (explore == false) {
      router.push("/businessList/" + item.name);
    } else {
      onCategorySelect(item.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={commonStyles.homeheading}>Category</Text>
          <TouchableOpacity
            onPress={() => router.push("/businessList/ShowAllBusinesses")}
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
      )}
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 15 }}
        data={categoryItem}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <CategoryItem
              category={item}
              isSelected={item.name === selectedCategory}
              onCategoryPress={() => onCategoryPressHandler(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default Category;
