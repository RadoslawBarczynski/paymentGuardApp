import { View, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import InfoTile from '../components/InfoTile'
import BigInfoTile from '../components/BigInfoTile'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../database/supabase'
import DoubleColorText from '../components/DoubleColorText'
import BottomBar from '../components/BottomBar'
import { Input, Button, Text} from 'react-native-elements'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LogoTextComponent from '../components/LogoTextComponent'

const ScreenOne = ({ setCurrentScreen, username, session }) => {
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlertCorrect = () => {
    setIsAlertVisible(true);

    // Ukryj alert po 3 sekundach
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1500);
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

  const addCost = async (price, description) =>{

    setLoading(true)
    const { user } = session

    const updates = {
      userId: user.id,
      price: price,
      description: description,
      timestamp: new Date(),
    }

    try {
    let {data, error } = await supabase.from('costs').insert(updates)

    if (error) {
        console.error('Błąd podczas dodawania rekordu:', error);
        showAlert('Błąd', 'Błąd podczas dodawania wydatku, sprawdź poprawność danych')
      } else {
        console.log('Rekord został dodany:', data);
        setPrice('');
        setDescription('');
        showAlertCorrect()
      }
    } catch (error) {
      console.error('Błąd podczas dodawania rekordu:', error.message);
      showAlert('Błąd', 'Błąd podczas dodawania rekordu')
    }
  };


  return (
    <View style={styles.container}>
       <LogoTextComponent />
      <View style={styles.content}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Text style={styles.title}>Dodaj wydatek!</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'dollar', color: 'white' }}
          onChangeText={(text) => setPrice(text)}
          value={price}
          placeholder="Kwota"
          placeholderTextColor={'#AAAAAA'}
          autoCapitalize={'none'}
          inputStyle={{'color':'white'}}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'pencil', color: 'white' }}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Opis"
          placeholderTextColor={'#AAAAAA'}
          autoCapitalize={'none'}
          inputStyle={{'color':'white'}}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
              title="DODAJ"
              buttonStyle={{
                backgroundColor: '#ed9818',
                borderWidth: 2,
                borderColor: '#ed9818',
                borderRadius: 30,
              }}
              containerStyle={{
                marginHorizontal: 70,
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 17 }}
              onPress={() =>  addCost(price, description)}
            />
      </View>
      </View>
      <Modal visible={isAlertVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sukces</Text>
            <Text style={styles.modalText}>Pomyślnie dodano wydatek!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      textAlign: 'center',
      height: '100%',
    },
    content:{
      width: '100%',
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch'
    },
    mt20: {
      marginTop: 20,
    },
    mt80: {
      marginTop: 80,
    },
    title:{
      fontSize: 30,
      textAlign: 'center',
      color: '#ed9818',
      fontWeight: 'bold'
    },
    subTitle:{
      fontSize: 17,
      textAlign: 'center',
      color: 'white'
    },
    button:{
      borderRadius: 15,
    },
    logoText:{
        color: 'white',
        fontSize: 30,
        textAlign: 'left',
        position: 'absolute',
        top: 25,
        left: 25
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Przezroczyste tło
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        elevation: 5, // Cień na Androidzie
        shadowColor: '#000', // Cień na iOS
        shadowOffset: { width: 0, height: 2 }, // Cień na iOS
        shadowOpacity: 0.25, // Cień na iOS
        shadowRadius: 3.84, // Cień na iOS
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      modalButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
      },
      modalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      button2: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
  })

export default ScreenOne;
