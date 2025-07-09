import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

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

// Mock trending events data
const mockTrendingEvents = [
  {
    id: 1,
    title: "Summer Music Festival 2025",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop",
    date: "Jul 15, 2025",
    time: "6:00 PM",
    location: "Victoria Island, Lagos",
    price: "₦15,000",
    category: "Music",
    attendees: 1250,
    trending: true,
  },
  {
    id: 2,
    title: "Tech Conference Lagos",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    date: "Jul 20, 2025",
    time: "9:00 AM",
    location: "Lekki Phase 1, Lagos",
    price: "₦25,000",
    category: "Technology",
    attendees: 850,
    trending: true,
  },
  {
    id: 3,
    title: "Lagos Food Festival",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    date: "Jul 25, 2025",
    time: "12:00 PM",
    location: "Ikeja GRA, Lagos",
    price: "₦8,000",
    category: "Food",
    attendees: 2100,
    trending: true,
  },
  {
    id: 4,
    title: "Art Exhibition Opening",
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
    date: "Jul 30, 2025",
    time: "4:00 PM",
    location: "Ikoyi, Lagos",
    price: "₦5,000",
    category: "Art",
    attendees: 450,
    trending: true,
  },
  {
    id: 5,
    title: "Business Networking Event",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    date: "Aug 2, 2025",
    time: "6:30 PM",
    location: "Surulere, Lagos",
    price: "₦12,000",
    category: "Business",
    attendees: 320,
    trending: true,
  },
];

const EventCard = ({ event, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <View style={styles.eventImageContainer}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <View style={styles.trendingBadge}>
        <Ionicons name="trending-up" size={12} color={colors.textPrimary} />
        <Text style={styles.trendingText}>Trending</Text>
      </View>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{event.category}</Text>
      </View>
    </View>
    
    <View style={styles.eventInfo}>
      <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
      
      <View style={styles.eventDetails}>
        <View style={styles.eventDetailRow}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText}>{event.date} • {event.time}</Text>
        </View>
        
        <View style={styles.eventDetailRow}>
          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText} numberOfLines={1}>{event.location}</Text>
        </View>
        
        <View style={styles.eventDetailRow}>
          <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
        </View>
      </View>
      
      <View style={styles.eventFooter}>
        <Text style={styles.eventPrice}>{event.price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [events, setEvents] = useState(mockTrendingEvents);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadTrendingEvents();
  }, []);

  const loadTrendingEvents = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockTrendingEvents);
    } catch (error) {
      console.error('Error loading trending events:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTrendingEvents();
    setRefreshing(false);
  };

  const handleEventPress = (event) => {
    // Navigate to event details
    console.log('Event pressed:', event.title);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading trending events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'User'}!</Text>
            <Text style={styles.subtitle}>Discover trending events</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Trending Events</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsGrid}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    backgroundColor: colors.cardBackground,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  eventsGrid: {
    gap: 16,
  },
  eventCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  eventImageContainer: {
    position: 'relative',
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '500',
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});