import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from './screens/WalletScreen';
import WalletDetailScreen from './screens/WalletDetailScreen';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { wallets, assets } from './dummyData';
import PortfolioScreen from './screens/PorfolioScreen';

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

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <CryptoLogo />
  </View>
);

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
            options={({ navigation }) => ({
              title: 'My Wallets',
              headerStyle: {
                backgroundColor: '#333', // Dark background
              },
              headerTintColor: '#fff', // Light text color
            })}
            initialParams={{ wallets, assets }}
          />
          <Stack.Screen
            name="Details"
            component={WalletDetailScreen}
            options={{ title: 'Wallet Details' }}
          />
          <Stack.Screen
            name="Portfolio"
            component={PortfolioScreen}
            options={{
              title: 'My Portfolio',
              headerStyle: {
                backgroundColor: '#333', // Dark background
              },
              headerTintColor: '#fff', // Light text color
            }}
            initialParams={{ wallets, assets }}
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
  portfolioButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1a73e8', // Blue background
    borderRadius: 20,
    marginRight: 10,
    marginTop: 20, // Adjust for proper spacing
  },
  portfolioButtonText: {
    color: '#fff',
    fontSize: 14, // Small font size
    fontWeight: 'bold',
  },
});
