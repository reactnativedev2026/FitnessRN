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
  Linking,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "../../constant";
import useOffers, { Offer } from "./useOffers";
import LoadingModal from "../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const OffersScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { offers, loading, refreshOffers } = useOffers();
  const handleOpenLink = (url: string | null) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    }
  };

  const renderOffer = ({ item }: { item: Offer }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Icon name="gift-outline" size={24} color={color.primary} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {moment(item.created_at).format("MMM DD, YYYY • hh:mm A")}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.description}>{item.description}</Text>

      {(item.video_or_url || item.url) && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleOpenLink(item.video_or_url || item.url)}
        >
          <Text style={styles.actionButtonText}>View Offer Details</Text>
          <Icon name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      )}

      {(item.phone_number) && (
        <View style={styles.contactContainer}>
          <Icon name="call-outline" size={14} color="#888" />
          <Text style={styles.contactText}>{item.phone_number}</Text>
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
          <Text style={styles.headerTitle}>Offers</Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOffer}
        contentContainerStyle={styles.listContainer}
        onRefresh={refreshOffers}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Icon name="gift-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No active offers found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default OffersScreen;

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
    backgroundColor: "#FFF9C4",
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
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: color.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  contactText: {
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
