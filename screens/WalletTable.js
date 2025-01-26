import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WalletTableView = ({ wallets }) => {
    return (
        <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Wallets Overview</Text>

            <ScrollView style={styles.scrollContainer}>
                <ScrollView horizontal={true} contentContainerStyle={styles.table}>
                    <View style={styles.tableContent}>
                        <View style={[styles.tableRow, styles.tableHeaderRow]}>
                            <Text style={[styles.tableHeader, styles.headerItem]}>ID</Text>
                            <Text style={[styles.tableHeader, styles.headerItem]}>Name</Text>
                            <Text style={[styles.tableHeader, styles.headerItem]}>Balance (ETH)</Text>
                        </View>

                        {wallets.map((wallet, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.tableRow,
                                    index % 2 === 1 ? styles.evenRow : styles.oddRow,
                                ]}
                            >
                                <Text style={styles.tableCell}>{wallet.id}</Text>
                                <Text style={styles.tableCell}>{wallet.name}</Text>
                                <Text style={styles.tableCell}>{wallet.balance}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#121212', // Matches chart's gradient background
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', // Matches chart label color
        marginBottom: 12,
    },
    scrollContainer: {
        width: '100%',
    },
    table: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 6,
    },
    tableContent: {
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#444', // Subtle border color
    },
    tableHeaderRow: {
        backgroundColor: '#333', // Matches the gradient's darker tone
    },
    tableHeader: {
        color: '#ffffff', // Matches chart label color
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 8,
        flex: 1,
    },
    headerItem: {
        flex: 1,
    },
    tableCell: {
        color: '#cccccc', // Subtle text color for rows
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 8,
        flex: 1,
    },
    evenRow: {
        backgroundColor: 'rgba(72, 219, 251, 0.1)', // Slightly matches chart dataset color
    },
    oddRow: {
        backgroundColor: '#121212', // Matches table background
    },
});

export default WalletTableView;
