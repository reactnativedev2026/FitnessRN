import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import { color } from '../../constant';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        title: 'Your weekly review has been answered',
        date: 'Jun 2, 2024 at 09:41 AM',
        unread: false,
      },
      {
        id: '2',
        title: 'New order assigned to you',
        date: 'Today at 10:15 AM',
        unread: true,
      },
    ],
  },
  {
    title: 'This week',
    data: [
      {
        id: '3',
        title: 'System update scheduled',
        date: 'Yesterday at 04:20 PM',
        unread: true,
      },
      {
        id: '4',
        title: 'Delivery completed successfully',
        date: 'Jun 1, 2024',
        unread: false,
      },
      {
        id: '5',
        title: 'Profile updated',
        date: 'May 30, 2024',
        unread: false,
      },
    ],
  },
];

const NotificationItem = ({ item }: { item: any }) => {
  return (
    <View
      style={[
        styles.itemContainer,
        item.unread && styles.unreadContainer
      ]}
    >
      <View style={[styles.dot, { backgroundColor: item.unread ? color.primary : 'rgba(255,255,255,0.1)' }]} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, item.unread && { fontWeight: '700' }]}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      {item.unread && <View style={styles.unreadBadge} />}
    </View>
  );
};

const NotificationsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        label={"Notification"}
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />
      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
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
});

export default NotificationsScreen;
