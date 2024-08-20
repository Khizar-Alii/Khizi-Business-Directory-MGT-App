import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
const MyBusiness = () => {
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    {
      user && getBusinessList();
    }
  }, [user]);

  const getBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress.emailAddress)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingHorizontal: 15 }}
        onPress={() => router.back()}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/5720/5720446.png",
          }}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.heading}>My Business</Text>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "50%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          <FlatList
            data={businessList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.listContent}
                  onPress={() =>
                    router.push("/businessDetail/" + businessList[index]?.id)
                  }
                >
                  <Image
                    style={styles.img}
                    source={{ uri: item?.imageUrl }}
                    resizeMode="cover"
                  />
                  <View style={styles.info}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[styles.text, { fontFamily: "karlaBold" }]}>
                        {item?.userName}
                      </Text>
                      <UseImage img="https://cdn-icons-png.flaticon.com/128/10536/10536191.png" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[styles.text]}>{item?.name}</Text>
                      <UseImage img="https://cdn-icons-png.flaticon.com/128/3281/3281412.png" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[styles.text]}>{item?.userEmail}</Text>
                      <UseImage img="https://cdn-icons-png.flaticon.com/128/944/944948.png" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[styles.text]}>{item?.address}</Text>
                      <UseImage img="https://cdn-icons-png.flaticon.com/128/535/535137.png" />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={[styles.text]}>{item?.contact}</Text>
                      <UseImage img="https://cdn-icons-png.flaticon.com/128/3192/3192750.png" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MyBusiness;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: Colors.light.background,
    height: "100%",
    paddingBottom: 100,
    flex: 1,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  heading: {
    fontSize: 30,
    paddingHorizontal: 25,
    fontFamily: "karlaBold",
  },
  listContent: {
    paddingVertical: 20,
    margin: 20,
    flex: 1,
    borderBottomWidth: 0.4,
    borderColor: Colors.GREY,
  },
  info: {
    backgroundColor: Colors.iconBackground,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  img: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: "karlaMedium",
    paddingVertical: 10,
  },
});

function UseImage({ img }) {
  return (
    <Image
      source={{ uri: img }}
      style={{
        width: 30,
        height: 30,
      }}
    />
  );
}
