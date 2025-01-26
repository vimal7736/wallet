import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PortfolioByAssets = ({ assets }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Portfolio by Assets</Text>
      {assets.map((asset) => (
        <View key={asset.id} style={styles.assetCard}>
          <Text style={styles.icon}>{asset.icon}</Text>
          <View>
            <Text style={styles.name}>
              {asset.name} ({asset.symbol})
            </Text>
            <Text style={styles.details}>
              {asset.balance} {asset.symbol} | ${asset.price.toFixed(2)} each
            </Text>
          </View>
          <Text style={styles.total}>
            ${ (asset.balance * asset.price).toFixed(2) }
          </Text>
        </View>
      ))}
    </View>
  );
};

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
    color: "#ffffff", 
  },
  assetCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#333", 
    borderRadius: 8,
    backgroundColor: "#2c2c2c", 
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
    color: "#b0b0b0", 
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  details: {
    fontSize: 14,
    color: "#b0b0b0", 
  },
  total: {
    marginLeft: "auto",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", 
  },
});

export default PortfolioByAssets;
