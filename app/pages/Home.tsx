import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import InfoTile from '../components/InfoTile'
import BigInfoTile from '../components/BigInfoTile'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../database/supabase'
import DoubleColorText from '../components/DoubleColorText'
import BottomBar from '../components/BottomBar'
import ScreenOne from './ScreenOne'
import ScreenTwo from './ScreenTwo'
import ScreenThree from './ScreenThree'
import Account from '../database/Account'



function Home({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [currentScreen, setCurrentScreen] = useState('screen1');

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <View>
      {currentScreen === 'screen1' && <ScreenOne username={username} setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'screen2' && <ScreenTwo username={username} setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'screen3' && <ScreenThree username={username} setCurrentScreen={setCurrentScreen} session={session} />}
      {currentScreen === 'screen4' && <Account setCurrentScreen={setCurrentScreen} session={session} />}
      <BottomBar onChangeScreen={setCurrentScreen} />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  logoText:{
    color: 'white',
    fontSize: 30,
    textAlign: 'left',
    position: 'absolute',
    top: 25,
    left: 25
  },
  wrapper:{
    gap:20
  },
  tileBody:{
    flexDirection:'row',
    gap:30
  },
  mt20: {
    marginTop: 20,
  },
})

export default Home