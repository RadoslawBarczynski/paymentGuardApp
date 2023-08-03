import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

function DoubleColorText({ username }) {
  return (
    <View style={[styles.body, styles.userText]}>
      <Text style={{fontSize:30, color:'white'}}>Witaj </Text>
      <Text style={[styles.usernameText, {fontSize: 30}]}>{username}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  usernameText: {
    color: '#ed9818', // Tutaj możesz ustawić dowolny kolor dla zmiennej username
    fontWeight: 'bold', // Możesz dodać inne style według potrzeb
  },
  body:{
    flexDirection: 'row',
  },
  userText:{
    marginBottom: 50,
    position: 'absolute',
    top: 130,
  },
});

export default DoubleColorText;
