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

const NonRegularHistory = ({ setCurrentHistory }) => {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    supabase
      .from('inregularcosts')
      .select('id, price, description, timestamp, userId, type')
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

  const calculateMonthlyTotals = (): Array<{ month: string; total: number; typeTotals: object }> => {
    const monthlyTotals: { [key: string]: { month: string; total: number; typeTotals: object } } = {};
    
  
    costs.forEach((cost) => {
      const date = new Date(cost.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Miesiące liczone od 0 do 11
      const key = `${year}-${String(month).padStart(2, '0')}`;
      
      if (!monthlyTotals[key]) {
        monthlyTotals[key] = {
          month: `${String(month).padStart(2, '0')}-${year}`,
          total: 0,
          typeTotals: {},
        };
      }
      
      if (!monthlyTotals[key].typeTotals[cost.type]) {
        monthlyTotals[key].typeTotals[cost.type] = 0;
      }
      
      monthlyTotals[key].total += cost.price;
      monthlyTotals[key].typeTotals[cost.type] += cost.price;
    });
  
    return Object.values(monthlyTotals);
  };

  const monthlyTotals = calculateMonthlyTotals();

  const getTypeLabel = (type) => {
    switch (type) {
      case 1:
        return 'Środki czystości';
      case 2:
        return 'Meble';
      case 3:
        return 'Sprzęty elektroniczne';
      case 4:
        return 'Sprzęty kuchenne';
      case 5:
        return 'Sprzęty do sprzątania';
      case 6:
        return 'Wyjścia';
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        style={styles.container}
        data={monthlyTotals}
        keyExtractor={(item) => item.month}
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
            <Text style={styles.costInfo}>Miesiąc: {item.month}</Text>
            <Text style={styles.costInfo}>Suma: {item.total.toFixed(2)}zł</Text>
            {Object.keys(item.typeTotals).map((type) => (
            <Text key={type} style={styles.costInfo}>
              {getTypeLabel(parseInt(type))}: {item.typeTotals[type].toFixed(2)}zł
            </Text>
          ))}
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

export default NonRegularHistory;
