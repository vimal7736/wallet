import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, RefreshControl, Animated, Switch, Button } from 'react-native';
import WalletChart from './WalletChart';

const WalletScreen = ({ navigation, route }) => {
    const { wallets } = route.params;
    const { assets } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredWallets, setFilteredWallets] = useState(wallets);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showChart, setShowChart] = useState(false);
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

    const renderWalletItem = ({ item }) => (
        <Pressable
            style={[styles.walletCard, { opacity: loading ? 0 : 1 }]}
            onPress={() => navigation.navigate('Details', { wallet: item })}
        >
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.walletInfo}>
                <Text style={styles.walletName}>{item.name}</Text>
                <Text style={styles.walletAddress}>{item.address}</Text>
                <Text style={styles.walletBalance}>{item.balance}</Text>
            </View>
        </Pressable>
    );

    const Dot = ({ color, delay }) => {
        const dotScale = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(dotScale, {
                        toValue: 1.5,
                        duration: 400,
                        delay: delay,
                        useNativeDriver: false
                    }),
                    Animated.timing(dotScale, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: false
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

            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Show Chart</Text>
                <Switch
                    value={showChart}
                    onValueChange={() => setShowChart((prev) => !prev)}
                />
            </View>

            <Pressable style={styles.portfolioButton} onPress={() => navigation.navigate('Portfolio')}>
                <Text style={styles.buttonText}>Go to Portfolio</Text>
            </Pressable>


            {loading ? (
                renderLoading()
            ) : showChart ? (
                <WalletChart
                    wallets={filteredWallets}
                    assets={assets}
                />
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
        backgroundColor: 'linear-gradient(180deg, rgba(32, 32, 32, 1) 0%, rgba(44, 44, 44, 1) 100%)',
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
        elevation: 4,
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    portfolioButton: {
        marginVertical: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#6200ea",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchLabel: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
    },

});

export default WalletScreen;
