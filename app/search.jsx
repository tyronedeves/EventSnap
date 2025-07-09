import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: "#0F0F23",
  cardBackground: "#1A1A2E",
  accent: "#16213E",
  primary: "#E94560",
  secondary: "#F39C12",
  textPrimary: "#FFFFFF",
  textSecondary: "#B8B8D1",
  success: "#2ECC71",
  warning: "#F39C12",
};

// Mock search data
const mockCategories = [
  { id: 1, name: "Music", icon: "musical-notes-outline", color: colors.primary },
  { id: 2, name: "Technology", icon: "laptop-outline", color: colors.secondary },
  { id: 3, name: "Food", icon: "restaurant-outline", color: colors.success },
  { id: 4, name: "Art", icon: "color-palette-outline", color: "#9B59B6" },
  { id: 5, name: "Business", icon: "briefcase-outline", color: "#E67E22" },
  { id: 6, name: "Sports", icon: "football-outline", color: "#1ABC9C" },
  { id: 7, name: "Education", icon: "book-outline", color: "#34495E" },
  { id: 8, name: "Comedy", icon: "happy-outline", color: "#F1C40F" },
];

const mockSearchResults = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    date: "Jul 15, 2025",
    location: "Victoria Island, Lagos",
    price: "₦15,000",
    category: "Music",
    attendees: 1250,
  },
  {
    id: 2,
    title: "Tech Conference Lagos",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    date: "Jul 20, 2025",
    location: "Lekki Phase 1, Lagos",
    price: "₦25,000",
    category: "Technology",
    attendees: 850,
  },
  {
    id: 3,
    title: "Jazz Night at Blue Note",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    date: "Jul 18, 2025",
    location: "Ikeja, Lagos",
    price: "₦8,000",
    category: "Music",
    attendees: 300,
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    date: "Jul 22, 2025",
    location: "Yaba, Lagos",
    price: "₦5,000",
    category: "Business",
    attendees: 200,
  },
];

const recentSearches = [
  "Music events",
  "Tech conferences",
  "Food festivals",
  "Art exhibitions",
];

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity style={[styles.categoryCard, { borderColor: category.color }]} onPress={onPress}>
    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
      <Ionicons name={category.icon} size={24} color={colors.textPrimary} />
    </View>
    <Text style={styles.categoryName}>{category.name}</Text>
  </TouchableOpacity>
);

const SearchResultItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.searchResultItem} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.resultImage} />
    <View style={styles.resultInfo}>
      <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
      <View style={styles.resultDetails}>
        <View style={styles.resultDetailRow}>
          <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.resultDetailText}>{item.date}</Text>
        </View>
        <View style={styles.resultDetailRow}>
          <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.resultDetailText} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.resultDetailRow}>
          <Ionicons name="people-outline" size={12} color={colors.textSecondary} />
          <Text style={styles.resultDetailText}>{item.attendees} attending</Text>
        </View>
      </View>
      <Text style={styles.resultPrice}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock results based on query
      const filteredResults = mockSearchResults.filter(
        item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.location.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryPress = (category) => {
    setSearchQuery(category.name);
  };

  const handleRecentSearchPress = (search) => {
    setSearchQuery(search);
  };

  const handleEventPress = (event) => {
    console.log('Event pressed:', event.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events, categories, locations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <>
            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Browse Categories</Text>
              <View style={styles.categoriesGrid}>
                {mockCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onPress={() => handleCategoryPress(category)}
                  />
                ))}
              </View>
            </View>

            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.recentSearches}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchItem}
                    onPress={() => handleRecentSearchPress(search)}
                  >
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </Text>
              {isSearching && <ActivityIndicator size="small" color={colors.primary} />}
            </View>
            
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                  <SearchResultItem
                    item={item}
                    onPress={() => handleEventPress(item)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : !isSearching ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
                <Text style={styles.noResultsText}>No events found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try searching for different keywords or browse categories
                </Text>
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.cardBackground,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '23%',
    borderWidth: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  recentSearches: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  recentSearchText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchResultItem: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  resultDetails: {
    gap: 4,
  },
  resultDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultDetailText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginLeft: 6,
    flex: 1,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});