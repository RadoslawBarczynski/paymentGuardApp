import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

function InfoTile({props}) {
  return (
    <View style={[styles.tileBody, {backgroundColor: props.color, borderColor: props.color ,...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),}]}>
      <Text style={styles.tileTitle}>{props.name}</Text>
      <Text style={styles.tileContentText}>{props.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tileBody:{
    borderWidth: 2,
    height: 150,
    width: 150,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        // Dla iOS, ustawiamy tło przezroczyste, aby cień wyglądał lepiej
        backgroundColor: 'transparent',
      },
    }),
  },
  tileTitle:{
    position:'absolute',
    top: 10,
    left: 10,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },
  tileContentText:{
    position:'absolute',
    bottom: 10,
    right: 10,
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold'
  }
  
})

export default InfoTile