import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl, Modal, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../component/common/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import { color } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GET_API } from '../../api/APIRequest';
import { ENDPOINT } from '../../api/endpoints';
import { logout } from '../../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyListMessage from '../../component/EmptyListMessage';
import CustomButton from '../../component/common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ScreenNameEnum from '../../routes/screenName.enum';

const NotificationItem = ({ item, isUnread, onPress }: { item: any; isUnread: boolean; onPress: () => void }) => {
  const rawDate = item.created_at || item.date || '';
  const formattedDate = rawDate ? moment(rawDate).fromNow() : '';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.itemContainer,
        isUnread && styles.unreadContainer
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={isUnread ? "notifications" : "notifications-outline"}
          size={24}
          color={isUnread ? color.primary : '#9CA3AF'}
        />
        {isUnread && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          style={[styles.title, isUnread && { fontWeight: '700' }]}
        >
          {item.title || item.message}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.message || 'No description available'}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificationDetailModal = ({
  visible,
  item,
  onClose,
  onGoToDetail
}: {
  visible: boolean;
  item: any;
  onClose: () => void;
  onGoToDetail: (item: any) => void;
}) => {
  if (!item) return null;
  const rawDate = item.created_at || item.date || '';
  const formattedDate = rawDate ? moment(rawDate).format('DD MMM YYYY, hh:mm A') : '';
  const relativeTime = rawDate ? moment(rawDate).fromNow() : '';
  const isDeliveryUpdate = item.type === 'delivery_update' && item.shipment_id;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalIconContainer}>
              <Icon name="notifications" size={32} color={color.primary} />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={20} color={color.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{item.title || 'Notification'}</Text>
            <Text style={styles.modalDate}>{formattedDate} ({relativeTime})</Text>
            <View style={styles.divider} />
            <Text style={styles.modalDescription}>{item.message || 'No details available'}</Text>
          </View>

          <View style={styles.modalFooter}>
            {isDeliveryUpdate && (
              <CustomButton
                onPress={() => onGoToDetail(item)}
                title="Go to Detail"
                style={[styles.footerButton, { marginBottom: 12 }]}
              />
            )}
            <CustomButton
              onPress={onClose}
              title="Close"
              bgColor="rgba(255,255,255,0.05)"
              txtcolor={color.white}
              style={styles.footerButton}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
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
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleNotificationPress = (item: any) => {
    markAsRead(item.id?.toString());
    setSelectedNotification(item);
    setModalVisible(true);
  };

  const handleGoToDetail = (item: any) => {
    setModalVisible(false);
    if (item.shipment_id) {
      navigation.navigate(ScreenNameEnum.DELIVERY_DETAIL as never, {
        deliveryId: item.shipment_id
      } as never);
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
      const response = await GET_API(ENDPOINT.NOTIFICATIONS, token, "GET", setLoading);

      if (response && response.success) {
        setNotifications(response.data || []);
        console.log("Notifications:", response.data || []);
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
        <>
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
                  onPress={() => handleNotificationPress(item)}
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
          <NotificationDetailModal
            visible={modalVisible}
            item={selectedNotification}
            onClose={() => setModalVisible(false)}
            onGoToDetail={handleGoToDetail}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  unreadContainer: {
    borderColor: 'rgba(35, 108, 237, 0.3)',
    backgroundColor: '#161F2E',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: color.primary,
    borderWidth: 2,
    borderColor: '#161F2E',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: color.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(35, 108, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIcon: {
    width: 28,
    height: 28,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: color.white,
    fontSize: 16,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: color.white,
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 24,
  },
  modalFooter: {
    width: '100%',
  },
  footerButton: {
    width: '100%',
  },
});

export default NotificationsScreen;
