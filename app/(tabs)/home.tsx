import React, { useCallback, useState, useMemo, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../screens/components/Header";
import ProductCard from "../screens/components/ProductCard";
import LanguageModal from "../screens/components/LanguageModal";
import { useCart } from "../src/context/CartContext";
import { useLanguage } from "../src/context/LanguageContext";
import { LocalizedStrings } from "../screens/localization/LocalizedStrings";


export default function HomeScreen() {
  const { cart, addToCart } = useCart(); // Cart context
  const { language, changeLanguage } = useLanguage(); // Language context
  const [languageModalVisible, setLanguageModalVisible] = useState(false);


  // Recompute localized products whenever language changes
  const BASE_PRODUCTS = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i.toString(),
      name: `${LocalizedStrings.HOME} ${LocalizedStrings.PRODUCT} ${i + 1}`,
      price: (10 + i).toFixed(2),
    }));
  }, [language]); // dependency on language


  // Update products when language changes
useEffect(() => {
  setProducts(BASE_PRODUCTS);
}, [BASE_PRODUCTS]);


  // Products state and loading state
  const [products, setProducts] = useState(BASE_PRODUCTS);
  const [loading, setLoading] = useState(false);

  // Function to load more products (infinite scroll)
  const loadMore = useCallback(() => {
    if (loading) return; // prevent multiple triggers
    setLoading(true);

    // Simulate network/loading delay
    setTimeout(() => {
      setProducts((prev) => [
        ...prev,
        ...BASE_PRODUCTS.map((item, index) => ({
          ...item,
          id: `${prev.length + index}-${item.id}`, // unique id for FlatList
        })),
      ]);
      setLoading(false);
    }, 1000); // 1-second delay
  }, [loading]);

  // Footer component to show loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with cart count and settings button */}
      <Header
        title={LocalizedStrings.HOME}
        cartCount={cart.length}
        onSettingsPress={() => setLanguageModalVisible(true)}
      />

      {/* Products list */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isAdded={cart.some((p) => p.id === item.id)}
            onAddToCart={() => addToCart(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.9}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
      />

      {/* Language selection modal */}
      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onLanguageChange={(lang) => {
          if (language !== lang) {
          changeLanguage(lang); // updates all components using language
          setLanguageModalVisible(false);
        }
        }}
      />
    </View>
  );
}

// Styles for HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 10,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
