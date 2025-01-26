import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Clipboard,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const WalletDetailScreen = ({ route }) => {
  const { wallet } = route.params;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: height,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleCopyAddress = () => {
    Clipboard.setString(wallet.address);
    Alert.alert('Copied to Clipboard!', wallet.address);
  };

  return (
    <View style={styles.container}>
      {/* Animated background */}
      <Animated.View
        style={[
          styles.backgroundAnimation,
          { transform: [{ translateY: translateY }] },
        ]}
      >
        {/* Add multiple crypto symbols */}
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Text key={index} style={styles.cryptoSymbol}>
              ₿
            </Text>
          ))}
      </Animated.View>

      {/* Foreground content */}
      <View style={styles.card}>
        <Text style={styles.icon}>{wallet.icon}</Text>
        <Text style={styles.title}>{wallet.name}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{wallet.address}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Balance:</Text>
          <Text style={styles.value}>{wallet.balance}</Text>
        </View>

        <Pressable style={styles.button} onPress={handleCopyAddress}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
    justifyContent: 'center',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: width,
    height: height * 9,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cryptoSymbol: {
    fontSize: 100,
    color: '#f39c12',
    opacity: 0.1,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',

    elevation: 5,
    zIndex: 10,
  },
  icon: {
    fontSize: 50,
    marginBottom: 16,
    color: '#f39c12',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#bbb',
    fontWeight: '500',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
    transition: 'background-color 0.3s ease',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WalletDetailScreen;
