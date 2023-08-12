import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'

function Selector({ setIsNonRegular }) {
  const [currentHistory, setCurrentHistory] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Nowy stan

  const color1 = currentHistory === true ? '#fff' : '#AAAAAA';
  const backgroundColor1 = currentHistory === true ? '#3D3D3D' : 'transparent';
  const color2 = currentHistory === false ? '#fff' : '#AAAAAA';
  const backgroundColor2 = currentHistory === false ? '#3D3D3D' : 'transparent';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor1 , borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
        onPress={() => {
          setIsNonRegular(false);
          setCurrentHistory(false);
          setShowDropdown(false);
        }}
      >
        <Text style={{ color: color1, fontWeight: 'bold', fontSize: 15 }}>Regularne</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.tab, backgroundColor: backgroundColor2 , borderTopRightRadius: 10, borderBottomRightRadius: 10}}
        onPress={() => {
          setIsNonRegular(true);
          setCurrentHistory(true);
          setShowDropdown(true);
        }}
      >
        <Text style={{ color: color2, fontWeight: 'bold', fontSize: 15 }}>Nieregularne</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: '60%',
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
  dropdown: {
    top: 45, // Dostosuj tę wartość do swoich potrzeb
    right: 0,
    backgroundColor: '#3D3D3D',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    zIndex: 2,
  },
  dropdownItem: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Selector;