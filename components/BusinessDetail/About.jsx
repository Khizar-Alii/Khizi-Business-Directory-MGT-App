import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {commonStyles} from "../../styles/CommonStyles"
import { Colors } from '../../constants/Colors'
const About = ({business}) => {
  return (
    <View>
      <Text style={[commonStyles.homeheading,{fontSize : 25}]}>About</Text>
      <Text style={styles.about}>{business?.about}</Text>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  about : {
    fontSize : 16,
    paddingHorizontal: 20,
    fontFamily : "karlaRegular",
    color : Colors.GREY
  }
})