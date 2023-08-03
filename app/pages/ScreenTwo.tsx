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
import LogoTextComponent from '../components/LogoTextComponent';
import CurrentMonthHistory from './currentMonthHistory'
import AllMonthHistory from './AllMonthlyHistory'
import TopHistoryBar from '../components/TopHistoryBar'

const ScreenOne = ({ setCurrentScreen, username }) => {
  const [costs, setCosts] = useState([]);
  const [currentHistory, setCurrentHistory] = useState('history1');

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
      <LogoTextComponent />
      <TopHistoryBar onChangeHistory={setCurrentHistory}/>
      <View style={{marginTop: 100, paddingBottom: 80}}>
      {currentHistory === 'history1' && <CurrentMonthHistory  setCurrentHistory={setCurrentHistory} />}
      {currentHistory === 'history2' && <AllMonthHistory  setCurrentHistory={setCurrentHistory} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
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
    backgroundColor: '#2B2D42',
    borderRadius: 8,
    borderColor: '#ed9818',
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

export default ScreenOne;
