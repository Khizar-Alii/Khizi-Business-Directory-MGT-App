import { FlatList, StyleSheet, Text, View,ScrollView } from "react-native";
import React from "react";
import ExploreBusinessListCard from "./ExploreBusinessListCard";

const ExploreBusinessList = ({ businessList }) => {
  return (
    <ScrollView>
        <FlatList
          data={businessList}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return <ExploreBusinessListCard business={item} />
          }}
        />
    </ScrollView>
  );
};

export default ExploreBusinessList;

const styles = StyleSheet.create({});
