import React, { useMemo } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, useCart } from '../src/context/CartContext';
import { LocalizedStrings } from '../screens/localization/LocalizedStrings';

export default function CartScreen() {
  const { cart, removeFromCart } = useCart(); // Cart context

  // Render each item in the cart
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash" size={22} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cart title */}
      <Text style={styles.title}>{LocalizedStrings.YOUR_CART}</Text>

      {/* Empty cart message */}
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>{LocalizedStrings.CART_EMPTY_MSG}.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

// Styles for CartScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 40, // Space for status bar
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20, // Extra padding for FlatList
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    flex: 1, // Ensure text does not overflow
  },
  price: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
