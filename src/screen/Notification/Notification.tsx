import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import { color } from '../../constant';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GET_API } from '../../api/APIRequest';
import { ENDPOINT } from '../../api/endpoints';
import { logout } from '../../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyListMessage from '../../compoent/EmptyListMessage';

const NotificationItem = ({ item, isUnread, onPress }: { item: any; isUnread: boolean; onPress: () => void }) => {
  const formattedDate = item.created_at || item.date || '';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.itemContainer,
        isUnread && styles.unreadContainer
      ]}
    >
      <View style={[styles.dot, { backgroundColor: isUnread ? color.primary : 'rgba(255,255,255,0.1)' }]} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isUnread && { fontWeight: '700' }]}>{item.title || item.message}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      {isUnread && <View style={styles.unreadBadge} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  useEffect(() => {
    loadReadStatus();
    fetchNotifications();
  }, []);

  const loadReadStatus = async () => {
    try {
      const saved = await AsyncStorage.getItem('read_notifications');
      if (saved) {
        setReadIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading read status", e);
    }
  };

  const markAsRead = async (id: string) => {
    if (readIds.includes(id)) return;
    
    const newReadIds = [...readIds, id];
    setReadIds(newReadIds);
    try {
      await AsyncStorage.setItem('read_notifications', JSON.stringify(newReadIds));
    } catch (e) {
      console.error("Error saving read status", e);
    }
  };

  const fetchNotifications = async () => {
    try {
      console.log("🔔 Fetching notifications with token:", token ? `${token.substring(0, 10)}...` : "NULL");
      const response = await GET_API(ENDPOINT.NOTIFICATIONS, token, "GET", setLoading);
      console.log("🔔 NOTIFICATIONS API RESPONSE:", response);
      
      if (response && response.success) {
        setNotifications(response.data || []);
      } else if (response?.message === "Unauthenticated.") {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        label={"Notification"}
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={color.primary} />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={color.primary}
              colors={[color.primary]}
            />
          }
          renderItem={({ item }) => {
            const isUnread = !readIds.includes(item.id?.toString());
            return (
              <NotificationItem 
                item={item} 
                isUnread={isUnread} 
                onPress={() => markAsRead(item.id?.toString())}
              />
            );
          }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40, paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyListMessage 
              message="No notifications found yet." 
              icon="notifications-off-outline" 
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 15,
    color: '#6F767E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  unreadContainer: {
    borderColor: 'rgba(35, 108, 237, 0.3)',
    backgroundColor: '#161F2E',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: color.white,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#6F767E',
    marginTop: 6,
  },
  unreadBadge: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.primary,
    marginLeft: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#6F767E',
  },
});

export default NotificationsScreen;
