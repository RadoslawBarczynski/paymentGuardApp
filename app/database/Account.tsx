import { useState, useEffect } from 'react'
import { supabase } from '../database/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import React from 'react'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
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
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled inputStyle={{'color':'white'}}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} inputStyle={{'color':'white'}} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} inputStyle={{'color':'white'}} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
              title="SAVE"
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
              onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
              disabled={loading}
            />
      </View>

      <View style={[styles.verticallySpaced, styles.mt80]}>
        <Button
              title="Sign up"
              buttonStyle={{
                borderColor: '#ed9818',
              }}
              type="outline"
              titleStyle={{ color: '#ed9818' }}
              containerStyle={{
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => supabase.auth.signOut()}
            />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  mt80: {
    marginTop: 80,
  },
})