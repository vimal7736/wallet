import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PortfolioByAssets from "./PortfolioByasset";
import Tabs from "../component/Tabs";
import WalletList from "../component/WalletList";

const PortfolioScreen = ({ route }) => {
  const { wallets, assets } = route.params;
  const [activeTab, setActiveTab] = useState("By Wallets");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crypto Portfolio</Text>
      <Text style={styles.description}>
        Track your wallets and asset holdings with ease.
      </Text>
      <Tabs tabs={["By Wallets", "By Assets"]} onTabChange={handleTabChange} />
      {activeTab === "By Wallets" && <WalletList wallets={wallets} />}
      {activeTab === "By Assets" && <PortfolioByAssets assets={assets} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#ffffff", 
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#b0b0b0", 
    marginBottom: 20,
  },
});

export default PortfolioScreen;
