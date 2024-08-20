import { View, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import { Colors } from "../../constants/Colors";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import BusinessList from "../../components/Home/BusinessList";

const Home = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: Colors.light.background,
        height: "100%",
      }}
    >
      <Header />
      <Slider />
      <Category />
      <BusinessList />
      <View style={{ marginBottom: 20 }} />
    </ScrollView>
  );
};

export default Home;
