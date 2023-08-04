import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../database/supabase';

function InfoTileV2({ color, name, content, contentDesc }) {
  const [lastRecord, setLastRecord] = useState(null);

  useEffect(() => {
    fetchLastRecordToday();
  }, []);


  const fetchLastRecordToday = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

      // Wywołanie metody 'select' dla tabeli 'records'
      const { data, error } = await supabase
        .from('costs')
        .select('price')
        .gte('timestamp', startOfDay.toISOString())
        .lte('timestamp', endOfDay.toISOString())
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Błąd podczas pobierania ostatniego rekordu:', error);
      } else {
        if (data.length > 0) {
          setLastRecord(data[0]);
        } else {
          setLastRecord(null);
        }
      }
    } catch (error) {
      console.error('Błąd podczas pobierania ostatniego rekordu:', error.message);
    }
  };
  return (
    <View style={[styles.tileBody, styles.shadow, { backgroundColor: color, borderColor: color }]}>
      <Text style={styles.tileTitle}>{name}</Text>
      <Text style={styles.tileContentTextDesc}>{contentDesc}</Text>
      <Text style={styles.tileContentTextDesc}>{contentDesc}</Text>
      <View style={styles.wrapper}>
        <Text style={styles.tileContentText}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tileBody: {
    borderWidth: 2,
    maxHeight: 100,
    minHeight: 100,
    flex: 1,
    width: 330,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        // Dla iOS, ustawiamy tło przezroczyste, aby cień wyglądał lepiej
        backgroundColor: 'transparent',
      },
    }),
  },
  shadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowColor: '#191919',
    shadowOpacity: 1,
    elevation: 5,
    // background color must be set
    backgroundColor : "black" // invisible color
    
  },
  tileTitle: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  wrapper: {
    position: 'absolute',
    right: 10,
  },
  tileContentText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  tileContentTextDesc:{
    fontSize: 15,
    color: 'white',
    left: 10,
    position: 'absolute',
  }
});

export default InfoTileV2;
