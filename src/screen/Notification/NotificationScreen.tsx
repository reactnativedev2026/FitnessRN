import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import AppSafeAreaView from '../../component/common/AppSafeAreaView';
import ScreenHeader from '../../component/common/ScreenHeader';
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
import { useAppTheme } from '../../theme/ThemeProvider';
import { AppThemeColors } from '../../theme/colors';
import StatusBarComponent from '../../component/common/StatusBarCompoent';
import { resetToLogin } from '../../routes/navigationService';

const NotificationItem = ({ item, isUnread, onPress }: { item: any; isUnread: boolean; onPress: () => void }) => {
  const rawDate = item.created_at || item.date || '';
  const formattedDate = rawDate ? moment(rawDate).fromNow() : '';
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

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
          color={isUnread ? theme.colors.primary : theme.colors.iconMuted}
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
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  if (!item) return null;
  const rawDate = item.created_at || item.date || '';
  const formattedDate = rawDate ? moment(rawDate).format('DD MMM YYYY, hh:mm A') : '';
  const relativeTime = rawDate ? moment(rawDate).fromNow() : '';
  const canOpenDetail = Boolean(item.workout_id || item.plan_id || item.shipment_id);

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
              <Icon name="notifications" size={32} color={theme.colors.primary} />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{item.title || 'Notification'}</Text>
            <Text style={styles.modalDate}>{formattedDate} ({relativeTime})</Text>
            <View style={styles.divider} />
            <Text style={styles.modalDescription}>{item.message || 'No details available'}</Text>
          </View>

          <View style={styles.modalFooter}>
            {canOpenDetail && (
              <CustomButton
                onPress={() => onGoToDetail(item)}
                title="Go to Detail"
                style={[styles.footerButton, { marginBottom: 12 }]}
              />
            )}
            <CustomButton
              onPress={onClose}
              title="Close"
              bgColor={theme.colors.chip}
              txtcolor={theme.colors.text}
              style={styles.footerButton}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);



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
    const workoutId = item.workout_id || item.plan_id || item.shipment_id;
    if (workoutId) {
      navigation.navigate(ScreenNameEnum.WorkoutPlan, {
        workoutId,
        notificationId: item.id,
      });
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
        resetToLogin();
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBarComponent />
      <ScreenHeader title="Notification" showNotification={false} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                tintColor={theme.colors.primary}
                colors={[theme.colors.primary]}
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
    </AppSafeAreaView>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  unreadContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.chip,
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
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primarySoft,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.modal,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.borderSoft,
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
    backgroundColor: colors.primarySoft,
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
    backgroundColor: colors.chip,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  modalDate: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: colors.textSecondary,
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
