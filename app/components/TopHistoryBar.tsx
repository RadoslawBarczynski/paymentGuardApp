import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function TopHistoryBar({ onChangeHistory }) {
  const [currentHistory, setCurrentHistory] = useState('history1');

  const color1 = currentHistory === 'history1' ? 'black' : '#fff';
  const backgroundColor1 = currentHistory === 'history1' ? '#fff' : 'transparent';
  const color2 = currentHistory === 'history2' ? 'black' : '#fff';
  const backgroundColor2 = currentHistory === 'history2' ? '#fff' : 'transparent';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor1 , borderTopLeftRadius: 30, borderBottomLeftRadius: 30}}
        onPress={() => {
          onChangeHistory('history1');
          setCurrentHistory('history1');
        }}
      >
        <Text style={{ color: color1, fontWeight: 'bold', fontSize: 15 }}>Ten miesiąc</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor2 , borderTopRightRadius: 30, borderBottomRightRadius: 30}}
        onPress={() => {
          onChangeHistory('history2');
          setCurrentHistory('history2');
        }}
      >
        <Text style={{ color: color2, fontWeight: 'bold', fontSize: 15 }}>Wszystkie miesiące</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //backgroundColor: '#b8740f',
    borderWidth: 1,
    borderColor: '#d48713',
    borderRadius: 30,
    height: 45,
    width: '60%',
    position: 'absolute',
    top:100,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TopHistoryBar;
