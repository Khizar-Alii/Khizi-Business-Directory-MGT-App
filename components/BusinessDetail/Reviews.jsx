import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { commonStyles } from "../../styles/CommonStyles";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Reviews = ({ business }) => {
  const [ratings, setRatings] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();
  const onSubmit = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    // Check if the user has already submitted a review
    const existingReview = business?.reviews?.find(
      (review) => review.userEmail === email
    );

    if (existingReview) {
      ToastAndroid.show(
        "You have already submitted a review.",
        ToastAndroid.BOTTOM
      );
      return; 
    }
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: ratings,
        comment: userInput,
        userName: user?.fullName,
        image: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    setUserInput("")
    ToastAndroid.show("Comment added successfully", ToastAndroid.BOTTOM);
  };

  return (
    <View style={styles.reviewContainer}>
      <Text style={commonStyles.homeheading}>Reviews</Text>
      {/* Business Review */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View key={index} style={styles.reviewContent}>
            <Image source={{ uri: item.image }} style={styles.reviewImage} />
            <View style={{flex :1}}> 
              <Text style={styles.name}>{item.userName}</Text>
              <Text style={styles.address}>{item.comment}</Text>
              <Rating imageSize={15} ratingCount={item?.rating} />
            </View>
          </View>
        ))}
      </View>
      {/* Input for Review */}
      <View>
        <Rating
          imageSize={25}
          onFinishRating={(rating) => {
            setRatings(rating);
          }}
          style={{ paddingVertical: 10 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Share your thoughts..."
            value={userInput}
            numberOfLines={4}
            onChangeText={(value) => setUserInput(value)}
            multiline={true} 
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.btnContainre}
            disabled={!userInput}
            onPress={onSubmit}
          >
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  reviewContainer: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderWidth: 1,
    marginVertical: 10,
    borderColor: Colors.GREY,
    borderRadius: 12,
    padding: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 6,
    fontFamily: "karlaMedium",
    paddingVertical: 6,
    textAlignVertical: "top",
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GREY,
    margin: 15,
    borderRadius: 20,
  },
  name: {
    fontFamily: "karlaBold",
    fontSize: 18,
  },
  address: {
    fontFamily: "karlaMedium",
    fontSize: 14,
    color: Colors.GREY,
    paddingBottom: 5,
  },
  btnContainre: {
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    padding: 15,
    width: wp("60%"),
    borderRadius: 14,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "karlaBold",
    color: Colors.dark.text,
  },
});
