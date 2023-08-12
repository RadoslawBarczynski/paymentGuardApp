import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function TopHistoryBar({ onChangeHistory }) {
  const [currentHistory, setCurrentHistory] = useState('history1');

  const color1 = currentHistory === 'history1' ? '#fff' : '#AAAAAA';
  const backgroundColor1 = currentHistory === 'history1' ? '#3D3D3D' : 'transparent';
  const color2 = currentHistory === 'history2' ? '#fff' : '#AAAAAA';
  const backgroundColor2 = currentHistory === 'history2' ? '#3D3D3D' : 'transparent';
  const color3 = currentHistory === 'history3' ? '#fff' : '#AAAAAA';
  const backgroundColor3 = currentHistory === 'history3' ? '#3D3D3D' : 'transparent';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor1 , borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
        onPress={() => {
          onChangeHistory('history1');
          setCurrentHistory('history1');
        }}
      >
        <Text style={{ color: color1, fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>Ten miesiąc</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor2}}
        onPress={() => {
          onChangeHistory('history2');
          setCurrentHistory('history2');
        }}
      >
        <Text style={{ color: color2, fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>Wszystkie miesiące</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor3 , borderTopRightRadius: 10, borderBottomRightRadius: 10}}
        onPress={() => {
          onChangeHistory('history3');
          setCurrentHistory('history3');
        }}
      >
        <Text style={{ color: color3, fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>Nieregularne</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#212121',
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: '80%',
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
