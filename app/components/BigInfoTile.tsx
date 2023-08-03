import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../database/supabase';

function BigInfoTile({ color, name, content, contentDesc }) {
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
    <View style={[styles.tileBody, { backgroundColor: color, borderColor: color, ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }), }]}>
      <Text style={styles.tileTitle}>{name}</Text>
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
    maxHeight: 150,
    minHeight: 100,
    flex: 1,
    width: 330,
    borderRadius: 20,
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
  tileTitle: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  wrapper: {
    position: 'absolute',
    right: 10,
  },
  tileContentText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  tileContentTextDesc:{
    fontSize: 18,
    color: 'white',
    left: 10,
    position: 'absolute',
  }
});

export default BigInfoTile;
