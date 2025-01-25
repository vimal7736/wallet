import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';

const WalletDetailScreen = ({ route }) => {
  const { wallet } = route.params;

  const handleCopyAddress = () => {
    Clipboard.setString(wallet.address);
    Alert.alert('Copied to Clipboard!', wallet.address);
  };

  return (
    <View style={styles.container}>
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
        
        <TouchableOpacity style={styles.button} onPress={handleCopyAddress}>
          <Text style={styles.buttonText}>Copy Address</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    transform: [{ scale: 1.02 }],
  },
  icon: { 
    fontSize: 50, 
    marginBottom: 16, 
    color: '#f39c12' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#fff' 
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
    fontWeight: '500' 
  },
  value: { 
    flex: 2, 
    fontSize: 16, 
    color: '#fff' 
  },
  button: {
    backgroundColor: '#16a085',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
    transition: 'background-color 0.3s ease',
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600' 
  },
});

export default WalletDetailScreen;
