import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import InfoTile from '../components/InfoTile'
import BigInfoTile from '../components/BigInfoTile'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../database/supabase'
import DoubleColorText from '../components/DoubleColorText'
import BottomBar from '../components/BottomBar'
import * as Animatable from 'react-native-animatable';
import LogoTextComponent from '../components/LogoTextComponent'

const ScreenOne = ({ setCurrentScreen, username }) => {
  const [recordsSum, setRecordsSum] = useState(0);
  const [recordsOfMonth, setRecordsOfMonth] = useState([]);
  const [lastRecord, setLastRecord] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [isScreenVisible, setIsScreenVisible] = useState(false);

  useEffect(() => {
    fetchRecordsSum();
    fetchRecordsOfMonth();
    fetchLastRecordToday();
    setIsScreenVisible(true);
  }, []);

  const fetchRecordsSum = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ustawia godzinę na 00:00:00

      // Wywołanie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price')
        .gte('timestamp', today.toISOString()); // Pobieramy rekordy od dzisiaj

      if (error) {
        console.error('Błąd podczas pobierania rekordów:', error);
      } else {
        // Obliczamy sumę rekordów
        const sum = data.reduce((acc, record) => acc + record.price, 0);
        setRecordsSum(sum.toFixed(2));
      }
    } catch (error) {
      console.error('Błąd podczas pobierania rekordów:', error.message);
    }
  };

  const fetchRecordsOfMonth = async () => {
    try {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      lastDayOfMonth.setHours(23, 59, 59, 999); // Ustawia godzinę na 23:59:59.999

      // Wywołanie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price')
        .gte('timestamp', firstDayOfMonth.toISOString())
        .lte('timestamp', lastDayOfMonth.toISOString());

      if (error) {
        console.error('Błąd podczas pobierania rekordów:', error);
      } else {
        const sum2 = data.reduce((acc, record) => acc + record.price, 0);
        setRecordsOfMonth(sum2.toFixed(2));
      }
    } catch (error) {
      console.error('Błąd podczas pobierania rekordów:', error.message);
    }
  };

  const fetchLastRecordToday = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

      // Wywołanie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price, description')
        .gte('timestamp', startOfDay.toISOString())
        .lte('timestamp', endOfDay.toISOString())
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Błąd podczas pobierania ostatniego rekordu:', error);
      } else {
        if (data.length > 0) {
          setLastRecord(data[0]);
          setPrice(data[0].price); // Rozbijamy wartość ceny na osobną zmienną
          setDescription(data[0].description); // Rozbijamy wartość opisu na osobną zmienną
        } else {
          setLastRecord(null);
          setPrice(0);
          setDescription('');
        }
      }
    } catch (error) {
      console.error('Błąd podczas pobierania ostatniego rekordu:', error.message);
    }
  };

    const showAlert = (name, content) => {
      Alert.alert(
        name,
        content,
        [
          {
            text: 'OK',
            onPress: () => console.log('Kliknięto OK'),
          },
        ],
        { cancelable: false } 
      );
    };

  return (
    <View style={styles.body}>
            <LogoTextComponent />
            <DoubleColorText username={username} />
       {isScreenVisible ? (
        <Animatable.View animation="slideInUp" duration={500} style={styles.content}>
      <View style={styles.wrapper}>
        <View style={styles.tileBody}>
          <InfoTile props={{ name: 'W miesiącu', content: `${recordsOfMonth}zł`, color: '#33c1a1' }} />
          <InfoTile props={{ name: 'Dzisiaj', content: `${recordsSum}zł`, color: '#FE724C' }} />
        </View>
        <BigInfoTile name="Ostatni wpis" content={price + 'zł'} contentDesc={description}  color="#2A5C99" />
      </View>
      </Animatable.View> ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default ScreenOne;
