import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const RightPanelSlider = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const slideAnimation = new Animated.Value(0);

  const togglePanel = () => {
    Animated.timing(slideAnimation, {
      toValue: isPanelVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsPanelVisible(!isPanelVisible);
  };

  const interpolatedSlide = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200], // Adjust the value to control panel slide distance
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePanel} style={styles.button}>
        <Text style={styles.buttonText}>Pokaż panel</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.panel, { right: interpolatedSlide }]}>
        <Text style={styles.panelText}>To jest zawartość panelu.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    fontSize: 16,
  },
});

export default RightPanelSlider;
