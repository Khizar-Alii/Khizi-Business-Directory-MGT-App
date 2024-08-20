import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';
import { router } from 'expo-router';

const ExploreBusinessListCard = ({business}) => {
    
  return (
    <TouchableOpacity style={styles.businessContent} onPress={()=>router.push("/businessDetail/" + business?.id)}>
        <Image source={{uri : business?.imageUrl}} style={styles.img} resizeMode='cover'/>
        <View style={styles.businessContentText}>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.address}>{business?.address}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ExploreBusinessListCard

const styles = StyleSheet.create({
    businessContent : {
        padding  :15,

    },
    businessContentText : {
        backgroundColor : Colors.iconBackground,
        marginTop : -40,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        alignItems:'center',
        paddingVertical : 10,
        borderBottomWidth : 0.3,
        borderColor : Colors.GREY
    },
    img : {
        width : '100%',
        height : 300,
        borderRadius : 10
    },
    name: {
        fontFamily: "karlaBold",
        fontSize: 18,
        paddingBottom :10
      },
      address: {
        fontFamily: "karlaMedium",
        fontSize: 14,
        color: Colors.GREY,
        paddingBottom: 5,
      },
})