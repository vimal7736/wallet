import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from './screens/WalletScreen';
import WalletDetailScreen from './screens/WalletDetailScreen';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg'; // Importing SVG components

// Rotating Cryptocurrency Logo (e.g., Bitcoin)
const CryptoLogo = () => {
  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <Path
          fill="gold"
          d="M50,10 C68.5,10 85,26.5 85,45 C85,63.5 68.5,80 50,80 C31.5,80 15,63.5 15,45 C15,26.5 31.5,10 50,10 Z"
        />
        <Path
          fill="black"
          d="M35,45 C35,48.5 40,50 45,50 C50,50 55,48.5 55,45 C55,41.5 50,40 45,40 C40,40 35,41.5 35,45 Z"
        />
      </Svg>
    </Animated.View>
  );
};

// Loading Screen with rotating crypto logo
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <CryptoLogo />
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time for how long the loading dots should show
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Wallets"
            component={WalletScreen}
            options={{ headerTitle: 'My Wallets' }}
          />
          <Stack.Screen
            name="Details"
            component={WalletDetailScreen}
            options={{ headerTitle: 'Wallet Details' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
});
