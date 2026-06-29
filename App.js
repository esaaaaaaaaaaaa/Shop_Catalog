import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const categories = [
    'all',
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        'https://fakestoreapi.com/products'
      );

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError(
        'Gagal memuat produk. Periksa koneksi internet.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
  };

  const applyFilters = (
    searchText,
    category
  ) => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter(
        (item) =>
          item.category === category
      );
    }

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.title
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          )
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (text) => {
    setSearch(text);
    applyFilters(text, selectedCategory);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    applyFilters(search, category);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text
        style={styles.productTitle}
        numberOfLines={2}
      >
        {item.title}
      </Text>

      <Text style={styles.price}>
        ${item.price}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      <Text style={styles.rating}>
        ⭐ {item.rating.rate} ({item.rating.count})
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        🛒 ShopCatalog
      </Text>

      <Text style={styles.countText}>
        Total Produk:
        {' '}
        {filteredProducts.length}
      </Text>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#00b894"
          />
          <Text style={styles.infoText}>
            Memuat produk...
          </Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>
            😢 {error}
          </Text>

          <TouchableOpacity
            style={styles.retryBtn}
            onPress={fetchProducts}
          >
            <Text style={styles.retryText}>
              🔄 Coba Lagi
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <>
          <TextInput
            placeholder="🔍 Cari produk..."
            value={search}
            onChangeText={handleSearch}
            style={styles.search}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            style={styles.categoryContainer}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryBtn,
                  selectedCategory ===
                    item &&
                    styles.activeCategory,
                ]}
                onPress={() =>
                  handleCategory(item)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory ===
                      item &&
                      styles.activeCategoryText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredProducts.length === 0 ? (
            <View style={styles.center}>
              <Text style={styles.emptyText}>
                😢 Produk tidak ditemukan
              </Text>

              <Text style={styles.infoText}>
                Coba kata kunci lain
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) =>
                item.id.toString()
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  countText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  infoText: {
    marginTop: 10,
    color: '#666',
  },

  errorText: {
    color: '#e74c3c',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },

  retryBtn: {
    backgroundColor: '#00b894',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  search: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  categoryContainer: {
    paddingLeft: 12,
    marginBottom: 10,
  },

  categoryBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 40,
  },

  activeCategory: {
    backgroundColor: '#00b894',
  },

  categoryText: {
    color: '#333',
  },

  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },

  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  price: {
    fontSize: 20,
    color: '#00b894',
    fontWeight: 'bold',
    marginTop: 8,
  },

  category: {
    color: '#666',
    marginTop: 5,
  },

  rating: {
    marginTop: 5,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});