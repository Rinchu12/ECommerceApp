import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LocalizedStrings } from "../localization/LocalizedStrings";
import { Product } from "@/app/src/context/CartContext";

interface ProductCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdded,
  onAddToCart,
}) => {
  // Get current language from context
  return (
    <View style={styles.card}>
      {/* Product Name */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Product Price */}
      <Text style={styles.price}>${product.price}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[styles.button, isAdded && styles.buttonAdded]}
        onPress={onAddToCart}
        disabled={isAdded}
        activeOpacity={0.7} // smooth press feedback
      >
        <Text style={styles.buttonText}>
          {isAdded ? LocalizedStrings.ADDED : LocalizedStrings.ADD_TO_CART}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    padding: 10,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonAdded: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});
