import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function BottomBar({ onChangeScreen }) {
  const [currentScreen, setCurrentScreen] = useState('screen1');

  const color1 = currentScreen === 'screen1' ? '#fff' : 'black';
  const color2 = currentScreen === 'screen2' ? '#fff' : 'black';
  const color3 = currentScreen === 'screen3' ? '#fff' : 'black';
  const color4 = currentScreen === 'screen4' ? '#fff' : 'black';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          onChangeScreen('screen1');
          setCurrentScreen('screen1');
        }}
      >
        <FontAwesome name="home" size={30} color={color1} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          onChangeScreen('screen2');
          setCurrentScreen('screen2');
        }}
      >
        <FontAwesome name="history" size={30} color={color2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          onChangeScreen('screen3');
          setCurrentScreen('screen3');
        }}
      >
        <FontAwesome name="plus-circle" size={30} color={color3} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => {
          onChangeScreen('screen4');
          setCurrentScreen('screen4');
        }}
      >
        <FontAwesome name="user" size={30} color={color4} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#b8740f',
    borderTopWidth: 1,
    borderTopColor: '#d48713',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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

export default BottomBar;
