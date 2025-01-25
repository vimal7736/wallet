import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, RefreshControl, Animated } from 'react-native';

// Sample data
const wallets = [
  { id: '1', name: 'Main Wallet', address: '0x742d...44e', balance: '2.5 ETH', icon: '💼' },
  { id: '2', name: 'Savings Wallet', address: '0x123d...123', balance: '1.8 ETH', icon: '🏦' },
  { id: '3', name: 'Trading Wallet', address: '0x456d...456', balance: '0.5 ETH', icon: '💱' },
  { id: '4', name: 'Crypto Wallet', address: '0x789d...789', balance: '3.4 ETH', icon: '💰' },
  { id: '5', name: 'Staking Wallet', address: '0x4567...890', balance: '2.0 ETH', icon: '🔒' },
  { id: '6', name: 'NFT Wallet', address: '0x987d...234', balance: '0.2 ETH', icon: '🖼️' },
];

const WalletScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWallets, setFilteredWallets] = useState(wallets);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchWallets = () => {
    setLoading(true);
    setTimeout(() => {
      setFilteredWallets(wallets);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setFilteredWallets(
        wallets.filter((wallet) =>
          wallet.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchWallets();
    setRefreshing(false);
  };

  const renderWalletItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.walletCard, { opacity: loading ? 0 : 1 }]} // Add fade-in effect when loading
      onPress={() => navigation.navigate('Details', { wallet: item })}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.walletInfo}>
        <Text style={styles.walletName}>{item.name}</Text>
        <Text style={styles.walletAddress}>{item.address}</Text>
        <Text style={styles.walletBalance}>{item.balance}</Text>
      </View>
    </TouchableOpacity>
  );

  // Custom Dot Loading Animation
  const Dot = ({ color, delay }) => {
    const dotScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([ 
          Animated.timing(dotScale, { 
            toValue: 1.5, 
            duration: 400, 
            delay: delay, 
            useNativeDriver: true 
          }),
          Animated.timing(dotScale, { 
            toValue: 1, 
            duration: 400, 
            useNativeDriver: true 
          })
        ])
      ).start();
    }, [dotScale]);

    return (
      <Animated.View
        style={[styles.dot, { backgroundColor: color, transform: [{ scale: dotScale }] }]}
      />
    );
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Dot color="#e74c3c" delay={0} />
      <Dot color="#f39c12" delay={200} />
      <Dot color="#2ecc71" delay={400} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Wallets..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#aaa"
      />
      {loading ? (
        renderLoading()
      ) : (
        <FlatList
          data={filteredWallets}
          renderItem={renderWalletItem}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'linear-gradient(180deg, rgba(32, 32, 32, 1) 0%, rgba(44, 44, 44, 1) 100%)', // Gradient background
  },
  searchInput: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#444',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  walletCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s ease-in-out', // Smooth card hover effect
  },
  walletCardHover: {
    transform: [{ scale: 1.05 }], // Scale up on hover (for web or interactive effect)
  },
  icon: { fontSize: 32, marginRight: 16, color: '#fff' },
  walletInfo: { flex: 1 },
  walletName: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  walletAddress: { color: '#aaa', marginVertical: 4 },
  walletBalance: { fontSize: 16, color: '#2ecc71', fontWeight: '500' },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 12,
    height: 12,
    marginHorizontal: 5,
    borderRadius: 6,
  },
});

export default WalletScreen;
