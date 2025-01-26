import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WalletList = ({ wallets }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Portfolio By Wallets</Text>
      {wallets.map((wallet) => (
        <View key={wallet.id} style={styles.walletCard}>
          <View>
            <Text style={styles.name}>{wallet.name}</Text>
            <Text style={styles.address}>{wallet.address}</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>
              {wallet.balance} 
            </Text>
            <Text style={styles.icon}>{wallet.icon}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#1e1e1e", 
    borderRadius: 10,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#ffffff", // Light text
  },
  walletCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    backgroundColor: "#2c2c2c", // Slightly lighter dark background
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  address: {
    fontSize: 14,
    color: "#b0b0b0",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  balance: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  icon: {
    fontSize: 18,
    color: "#b0b0b0",
    marginLeft: 8,
  },
});



export default WalletList;
