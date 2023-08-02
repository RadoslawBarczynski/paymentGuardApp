import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '../database/supabase'
import { Button, Input, Text } from 'react-native-elements'
import { color } from 'react-native-elements/dist/helpers'

//#FFC529 - yellow
//#ed9818 - yellowV2
//#FE724C - red
//#212121 - black
//#D7D7D7 - grey

export default function Auth({ toggleShowRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subTitle}>Sign up to continue</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          placeholderTextColor={'white'}
          autoCapitalize={'none'}
          inputStyle={{'color':'white'}}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={'white'}
          autoCapitalize={'none'}
          inputStyle={{'color':'white'}}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
              title="SIGN UP"
              buttonStyle={{
                backgroundColor: '#ed9818',
                borderWidth: 2,
                borderColor: '#ed9818',
                borderRadius: 30,
              }}
              containerStyle={{
                marginHorizontal: 70,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 17 }}
              onPress={() => signUpWithEmail()}
              disabled={loading}
            />
      </View>
      <View style={[styles.verticallySpaced, styles.mt80]}>
      <Button
              title="Login"
              buttonStyle={{
                borderColor: '#ed9818',
              }}
              type="outline"
              titleStyle={{ color: '#ed9818' }}
              containerStyle={{
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={ toggleShowRegister }
            />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  content:{
    width: '100%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20,
  },
  mt80: {
    marginTop: 80,
  },
  title:{
    fontSize: 30,
    textAlign: 'center',
    color: '#ed9818',
    fontWeight: 'bold'
  },
  subTitle:{
    fontSize: 17,
    textAlign: 'center',
    color: 'white'
  },
  button:{
    borderRadius: 15,
  }
})