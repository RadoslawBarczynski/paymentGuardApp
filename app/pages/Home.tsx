import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import LoginTextComponents from '../components/LoginTextComponents'
import LoginInputComponent from '../components/LoginInputComponent'
import { Session } from '@supabase/supabase-js'

export default function Home({ session }: { session: Session }) {
  return (
    <View style={styles.body}>
      <Button
        title="Learn More"
        color="#841584"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
})