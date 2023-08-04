import { View, Text, Button, StyleSheet, Alert, FlatList, Platform } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import InfoTile from '../components/InfoTile'
import BigInfoTile from '../components/BigInfoTile'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../database/supabase'
import DoubleColorText from '../components/DoubleColorText'
import BottomBar from '../components/BottomBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LogoTextComponent from '../components/LogoTextComponent'

const currentMonthHistory = ({ setCurrentHistory }) => {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    supabase
      .from('costs')
      .select('id, price, description, timestamp, userId')
      .order('timestamp', { ascending: false }) 
      .limit(10)
      .then(({ data, error }) => {
        if (error) {
          console.error('Błąd podczas pobierania rekordów:', error);
        } else {
          setCosts(data);
        }
      });
  }, []);

  useEffect(() => {
    if (costs.length > 0) {
      const userIds = costs.map((cost) => cost.userId);

      supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds)
        .then(({ data, error }) => {
          if (error) {
            console.error('Błąd podczas pobierania nazw użytkowników:', error);
          } else {
            const updatedCosts = costs.map((cost) => {
              const user = data.find((u) => u.id === cost.userId);
              return { ...cost, username: user ? user.username : '' };
            });

            setCosts(updatedCosts);
          }
        });
    }
  }, [costs]);

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Miesiące liczone od 0 do 11
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <View style={styles.body}>
      <FlatList
        style={styles.container}
        data={costs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.costItem, {...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          })}]}>
            <Text style={styles.costInfo}>Kwota: {item.price}zł</Text>
            <Text style={styles.costInfo}>Opis: {item.description}</Text>
            <Text style={styles.costInfo}>Data: {formatDate(item.timestamp)}</Text>
            <Text style={styles.costInfo}>Użytkownik: {item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
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
  container: {
    marginTop: 80,
  },
  costItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#3D3D3D',
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    width: 300,
    ...Platform.select({
      ios: {
        // Dla iOS, ustawiamy tło przezroczyste, aby cień wyglądał lepiej
        backgroundColor: 'transparent',
      },
    }),
  },
  costInfo: {
    fontSize: 16,
    marginBottom: 5,
    width: '100%',
    color: 'white'
  },
})

export default currentMonthHistory;
