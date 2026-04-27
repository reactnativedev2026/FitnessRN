import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "../../constant";
import useAnnouncements, { Announcement } from "./useAnnouncements";
import LoadingModal from "../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const AnnouncementsScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { announcements, loading, refreshAnnouncements } = useAnnouncements();

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon 
            name={item.type === "Normal" ? "notifications-outline" : "megaphone-outline"} 
            size={24} 
            color={color.primary} 
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {moment(item.created_at).format("MMM DD, YYYY • hh:mm A")}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.message}>{item.message}</Text>
      {item.city && (
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={14} color="#888" />
          <Text style={styles.locationText}>{item.city}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loading} />
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={[color.primary, color.primary]}
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === "android" ? insets.top + 10 : 10,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Announcements</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnnouncement}
        contentContainerStyle={styles.listContainer}
        onRefresh={refreshAnnouncements}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Icon name="notifications-off-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No announcements found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default AnnouncementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F8",
  },
  header: {
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  locationText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
});
