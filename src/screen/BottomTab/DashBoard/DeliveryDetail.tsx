import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../compoent/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_API } from '../../../api/APIRequest';
import { ENDPOINT } from '../../../api/endpoints';
import LoadingModal from '../../../utils/Loader';
import moment from 'moment';
import ScreenNameEnum from '../../../routes/screenName.enum';

const DeliveryDetail = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { deliveryId } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState<any>(null);

  const fetchDeliveryDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const response = await GET_API(`${ENDPOINT.DELIVERY_DETAIL}${deliveryId}`, token, "GET", setLoading);
      if (response && response.success) {
        setDelivery(response.data);
      }
    } catch (error) {
      console.error("Error fetching delivery detail:", error);
    }
  };

  useEffect(() => {
    if (deliveryId) {
      fetchDeliveryDetail();
    }
  }, [deliveryId]);

  if (!delivery && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader
          label='Delivery Details'
          menuIcon={imageIndex.back}
          leftPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Delivery not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      <CustomHeader
        label='Delivery Details'
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Tracking & Status Card */}
        <View style={styles.topCard}>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.trackingLabel}>Tracking Number</Text>
              <Text style={styles.trackingNumber}>{delivery?.tracking_number}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: delivery?.shipment_status === 'delivered' ? 'rgba(44, 197, 157, 0.2)' : 'rgba(3, 80, 147, 0.2)' }]}>
              <Text style={[styles.statusText, { color: delivery?.shipment_status === 'delivered' ? '#2CC59D' : color.primary }]}>
                {delivery?.shipment_status_label}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.dateRow}>
            <Icon name="calendar-outline" size={18} color="#6F767E" />
            <Text style={styles.dateText}>Expected: {moment(delivery?.expected_delivery).format('DD MMM YYYY')}</Text>
          </View>
        </View>

        {/* Address Path Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Route Details</Text>
          <View style={styles.addressContainer}>
            <View style={styles.pathLine}>
              <View style={styles.dot} />
              <View style={styles.verticalLine} />
              <View style={[styles.dot, { backgroundColor: color.primary }]} />
            </View>
            <View style={styles.addressContent}>
              <View style={styles.addressBlock}>
                <Text style={styles.addressLabel}>Pickup Location</Text>
                <Text style={styles.addressText}>{delivery?.origin?.address}</Text>
              </View>
              <View style={{ height: 30 }} />
              <View style={styles.addressBlock}>
                <Text style={styles.addressLabel}>Destination Location</Text>
                <Text style={styles.addressText}>{delivery?.destination?.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Package Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Package Info</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Package Type</Text>
              <Text style={styles.infoValue}>{delivery?.package_type}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Quantity</Text>
              <Text style={styles.infoValue}>{delivery?.quantity} Units</Text>
            </View>
          </View>
        </View>
        {/* 
--- get delivery detail by id
--- Update status API
--- Start delevery Status update
--- Arrived destination Status update
--- Delivered status update
--- add signature api
--- add image upload api
--- open in google map for drop location
--- copy drop address 
--- delivery drop address get
--- Submit delivery form
--- get detail after success
--- real time update after change status

*/}
        {/* Client Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Client Information</Text>
          <View style={styles.clientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{delivery?.client_name?.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.clientName}>{delivery?.client_name}</Text>
              <Text style={styles.contactPerson}>Contact: {delivery?.contact_person}</Text>
            </View>
          </View>
        </View>

        {/* Special Instructions */}
        {delivery?.special_instructions && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>{delivery?.special_instructions}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {delivery?.shipment_status !== 'delivered' && (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate(ScreenNameEnum.RaceDetail as any, { deliveryId: delivery?.id } as any)}
            >
              <Text style={styles.buttonText}>Update Status</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A16',
  },
  topCard: {
    backgroundColor: '#111827',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackingLabel: {
    color: '#6F767E',
    fontSize: 12,
    marginBottom: 4,
  },
  trackingNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 15,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: '#111827',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
  },
  pathLine: {
    width: 20,
    alignItems: 'center',
    paddingVertical: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3E8BFF',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  addressContent: {
    flex: 1,
    marginLeft: 15,
  },
  addressBlock: {
    flex: 1,
  },
  addressLabel: {
    color: '#6F767E',
    fontSize: 12,
    marginBottom: 4,
  },
  addressText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    color: '#6F767E',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  clientName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  contactPerson: {
    color: '#6F767E',
    fontSize: 13,
    marginTop: 2,
  },
  instructionBox: {
    backgroundColor: 'rgba(255, 77, 77, 0.05)',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF4D4D',
  },
  instructionText: {
    color: '#9CA3AF',
    fontSize: 13,
    lineHeight: 18,
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: color.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default DeliveryDetail;
