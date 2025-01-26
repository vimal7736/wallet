import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import WalletTableView from './WalletTable';

const WalletChart = ({ wallets }) => {
    const [isLineChart, setIsLineChart] = useState(true);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const updateWidth = () => setScreenWidth(Dimensions.get('window').width);
        const subscription = Dimensions.addEventListener('change', updateWidth);

        return () => subscription?.remove();
    }, []);

    const chartData = {
        labels: wallets.map(wallet => wallet.id),
        datasets: [
            {
                data: wallets.map(wallet => parseFloat(wallet.balance)),
                color: (opacity = 1) => `rgba(72, 219, 251, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#2C3E50',
        backgroundGradientTo: '#121212',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // Line thickness
        barPercentage: 0.5,
        decimalPlaces: 2, // Limit decimals
        propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#1ABC9C',
        },
    };

    const handleChartSwitch = () => {
        setIsLineChart(!isLineChart);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Wallet Performance</Text>

            <TouchableOpacity style={styles.toggleButton} onPress={handleChartSwitch}>
                <Text style={styles.toggleButtonText}>
                    Switch to {isLineChart ? 'Table' : 'Line Chart'}
                </Text>
            </TouchableOpacity>

            {isLineChart ? (
                <LineChart
                    data={chartData}
                    width={screenWidth - 40} // Account for padding/margin
                    height={300}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            ) : (
                <WalletTableView wallets={wallets} />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#2C3E50',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    toggleButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default WalletChart;
