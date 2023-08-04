import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Account from './app/database/Account'
import Auth from './app/database/Auth'
import AuthRegister from './app/database/AuthRegister'
import { supabase } from './app/database/supabase'
import React from 'react'
import Home from './app/pages/Home'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const toggleShowRegister = () => {
    setShowRegister((prevState) => !prevState); // Przełączanie wartości między true i false
  };

  return (
    <View style={styles.body}>
      {/* Wyświetlanie odpowiedniego komponentu na podstawie wartości showRegister */}
      {session && session.user ? (
        //<Account key={session.user.id} session={session} />
        <Home key={session.user.id} session={session}/>
      ) : showRegister ? (
        <AuthRegister toggleShowRegister={toggleShowRegister} />
      ) : (
        <Auth toggleShowRegister={toggleShowRegister} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: '#181818',
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  }
})