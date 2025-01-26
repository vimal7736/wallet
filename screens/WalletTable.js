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
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
    },
    tableTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ecf0f1',
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
        borderBottomColor: '#ccc',
    },
    tableHeaderRow: {
        backgroundColor: '#333',
    },
    tableHeader: {
        color: '#ecf0f1',
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
        color: '#bdc3c7',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 8,
        flex: 1,
    },
    evenRow: {
        backgroundColor: '#333',
    },
    oddRow: {
        backgroundColor: '#333',
    },
});

export default WalletTableView;
