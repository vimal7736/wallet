import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, RefreshControl, Animated } from 'react-native';

const wallets = [
    { id: '1', name: 'Main Wallet', address: '0x742d...44e', balance: '2.5 ETH', icon: '💼' },
    { id: '2', name: 'Savings Wallet', address: '0x123d...123', balance: '1.8 ETH', icon: '🏦' },
    { id: '3', name: 'DeFi Wallet', address: '0xabc1...d123', balance: '3.2 ETH', icon: '⚡' },
    { id: '4', name: 'Mining Rewards Wallet', address: '0xdef4...g456', balance: '10.0 ETH', icon: '⛏️' },
    { id: '5', name: 'Staking Rewards Wallet', address: '0xghi7...h789', balance: '5.6 ETH', icon: '🔒' },
    { id: '6', name: 'Token Swap Wallet', address: '0xjkl0...i012', balance: '1.2 ETH', icon: '🔄' },
    { id: '7', name: 'NFT Collection Wallet', address: '0x567m...n345', balance: '0.6 ETH', icon: '🖼️' },
    { id: '8', name: 'Airdrop Wallet', address: '0x789o...p678', balance: '0.3 ETH', icon: '🎁' },
    { id: '9', name: 'Governance Wallet', address: '0x123q...r901', balance: '0.8 ETH', icon: '📜' },
    { id: '10', name: 'Metaverse Wallet', address: '0x456s...t234', balance: '1.1 ETH', icon: '🌌' },
    { id: '11', name: 'Yield Farming Wallet', address: '0x789u...v567', balance: '3.8 ETH', icon: '🌾' },
    { id: '12', name: 'Smart Contract Wallet', address: '0xabcw...x890', balance: '4.5 ETH', icon: '📑' },
    { id: '13', name: 'Stablecoin Wallet', address: '0xdefy...y123', balance: '1000 USDT', icon: '💵' },
    { id: '14', name: 'DEX Wallet', address: '0xghiz...z456', balance: '2.2 ETH', icon: '⚙️' },
    { id: '15', name: 'Gaming Wallet', address: '0x123a...a789', balance: '0.4 ETH', icon: '🎮' },
    { id: '16', name: 'ICO Wallet', address: '0x456b...b012', balance: '3.0 ETH', icon: '🚀' },
    { id: '17', name: 'Cold Storage Wallet', address: '0x789c...c345', balance: '8.5 ETH', icon: '❄️' },
    { id: '18', name: 'Charity Wallet', address: '0x123d...d678', balance: '1.0 ETH', icon: '❤️' },
    { id: '19', name: 'Bridge Wallet', address: '0x456e...e901', balance: '2.4 ETH', icon: '🌉' },
    { id: '20', name: 'Gas Fee Wallet', address: '0x789f...f234', balance: '0.05 ETH', icon: '⛽' },
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
