import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebaseConfig";
import Butoon from "../../components/Button/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const AddBusiness = () => {
  const [pickImg, setPickImg] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: "",
    address: "",
    contact: "",
    website: "",
    about: "",
    category: "",
  });
  const { user } = useUser();

  const handleImgPress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPickImg(result.assets[0].uri);
      } else {
        ToastAndroid.show("No image selected", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
      ToastAndroid.show("An error occurred while selecting the image", ToastAndroid.SHORT);
    }
  };
  

  const handleInputChange = (key, value) => {
    setInputsData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const docSnapshot = await getDocs(q);
    docSnapshot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };
  const onAddnewBusiness = async () => {
    const { name, address, contact, about } = inputsData;

    // Check if required fields are empty
    if (!name || !address || !contact || !about || !pickImg) {
      ToastAndroid.show(
        "Please fill out all required details",
        ToastAndroid.SHORT
      );
      return;
    }
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(pickImg);
    const blob = await resp.blob();
    const imgRef = ref(storage, "business-directory/" + fileName);
    uploadBytes(imgRef, blob)
      .then((snapshot) => {
        console.log("File Uploaded...");
      })
      .then((resp) => {
        getDownloadURL(imgRef).then(async (downloadUrl) => {
          saveBusinessDetails(downloadUrl);
        });
        setLoading(false);
      });

  };
  const saveBusinessDetails = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: inputsData.name,
      address: inputsData.address,
      contact: inputsData.contact,
      website: inputsData.website,
      about: inputsData.about,
      category: inputsData.category,
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });
    setPickImg(null);
    setLoading(false);
    setLoading(false);
    ToastAndroid.show("Business Added Successfully", ToastAndroid.BOTTOM);
    router.push('(tabs)/Home')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{paddingHorizontal:20,paddingTop:10}} onPress={()=>router.back()}>
      <Image style={{width: 50,height:50}} source={{
        uri : 'https://cdn-icons-png.flaticon.com/128/5720/5720446.png'
      }} />
      </TouchableOpacity>
      <Text style={styles.heading}>Add New Business</Text>
      <Text style={styles.desc}>
        Fill out below details in order to add new Business.
      </Text>
      <ScrollView>
        <View style={styles.imgContainer}>
          <TouchableOpacity onPress={handleImgPress}>
            {!pickImg ? (
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/6631/6631821.png",
                }}
                style={styles.img}
              />
            ) : (
              <Image source={{ uri: pickImg }} style={styles.img} />
            )}
          </TouchableOpacity>
          {!pickImg ? (
            <Text style={styles.imgHeading}>Choose an Business Image</Text>
          ) : (
            <Text style={styles.imgHeading}>Image selected Successfully</Text>
          )}
        </View>
        {/* All the input fields */}
        <View style={{ height: "100%", marginBottom: 40 }}>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/10536/10536191.png",
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Business Name..."
              onChangeText={(value) => handleInputChange("name", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/9572/9572671.png",
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Address..."
              onChangeText={(value) => handleInputChange("address", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3192/3192750.png",
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Contact..."
              onChangeText={(value) => handleInputChange("contact", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3308/3308395.png",
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Plz Provide website Link if your have"
              onChangeText={(value) => handleInputChange("website", value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/1180/1180260.png",
              }}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.input, { textAlignVertical: "top" }]}
              placeholder="Describe your business"
              numberOfLines={5}
              multiline={true}
              onChangeText={(value) => handleInputChange("about", value)}
            />
          </View>
          <View style={styles.inputCategory}>
            <RNPickerSelect
              style={{
                iconContainer: {
                  top: 20,
                  right: 10,
                },
                placeholder: {
                  color: Colors.GREY,
                  fontFamily: "karlaMedium",
                  fontSize: 12,
                },
              }}
              onValueChange={(value) => handleInputChange("category", value)}
              items={categoryList}
            />
          </View>
          {loading ? (
            <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          ) : (
            <Butoon title="Add New Business" onPress={onAddnewBusiness} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    height: "100%",
    paddingTop: 15,
  },
  heading: {
    fontSize: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    fontFamily: "karlaBold",
  },
  desc: {
    fontSize: 16,
    fontFamily: "karlaMedium",
    paddingHorizontal: 20,
    color: Colors.GREY,
  },
  imgContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  imgHeading: {
    fontSize: 14,
    fontFamily: "karlaMedium",
    color: Colors.GREY,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    margin: 15,
    borderColor: Colors.GREY,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    paddingHorizontal: 6,
    fontFamily: "karlaMedium",
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  inputCategory: {
    borderWidth: 1,
    borderColor: Colors.GREY,
    margin: 15,
    borderRadius: 12,
  },
});
