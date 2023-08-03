import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LogoTextComponent() {
  return (
    <View style={styles.body}>
      <Text style={[styles.logoText, styles.firstPartLogo]}><FontAwesome name="shield" size={30} color="#ed9818" />Pay</Text>
      <Text style={styles.logoText}>Guard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        textAlign: 'left',
        position: 'absolute',
        top: 25,
        left: 25,
        flexDirection: 'row'
    },
    logoText:{
      color: 'white',
      fontSize: 30,
      textAlign: 'left',
    },
    firstPartLogo:{
        color: '#ed9818'
    }
})