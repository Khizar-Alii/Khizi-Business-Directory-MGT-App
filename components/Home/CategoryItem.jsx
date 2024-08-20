import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CategoryItem = ({ category, onCategoryPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? Colors.PRIMARY
              : Colors.iconBackground,
          },
        ]}
      >
        <Image
          source={{
            uri: category.icon,
          }}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "karlaRegular",
          textAlign: "center",
          marginRight: 15,
          marginTop: 3,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.iconBackground,
    marginRight: 15,
    borderRadius: 99,
  },
});
