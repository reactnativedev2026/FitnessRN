import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { color } from '../../../theme/colors';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ReportIssueModal from '../../../component/ReportIssueModal';
import useDashboard from './useDashboard';

import Toast from 'react-native-toast-message';

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#d1d5db" }] },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "poi.place_of_worship",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#263c3f" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#6b9a76" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#718096" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#212a37" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#9ca3af" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#1f2835" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{ "color": "#2f3948" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#17263c" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#2b5a56ff" }]
  }
];

const DeliveryMap = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { delivery } = route.params || {};
  const [showReportModal, setShowReportModal] = useState(false);
  const { selectedAddress, selectedAddress2 } = useDashboard();
  const mapRef = useRef<MapView>(null);
  const [routeCoords, setRouteCoords] = useState<Array<{ latitude: number; longitude: number }>>([]);
  const [distance, setDistance] = useState("4.2 km");
  const [duration, setDuration] = useState("15 min");

  // Calculate coordinates dynamically with route parameters or useDashboard fallbacks
  const pickupLocation = {
    latitude: delivery?.origin?.latitude ? parseFloat(delivery.origin.latitude) : selectedAddress?.latitude || 22.7196,
    longitude: delivery?.origin?.longitude ? parseFloat(delivery.origin.longitude) : selectedAddress?.longitude || 75.8577,
    address: delivery?.origin?.address || selectedAddress?.address || "Sapphire House, Indore"
  };

  const dropLocation = {
    latitude: delivery?.destination?.latitude ? parseFloat(delivery.destination.latitude) : selectedAddress2?.latitude || 22.7012,
    longitude: delivery?.destination?.longitude ? parseFloat(delivery.destination.longitude) : selectedAddress2?.longitude || 75.8711,
    address: delivery?.destination?.address || selectedAddress2?.address || "Shivampuri Colony, Indore"
  };

  const handleCall = () => {
    const phoneNumber = '+162234567890';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Issue Reported:', data);
    setShowReportModal(false);
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Issue reported successfully! 👋',
      });
    }, 500);
  };

  const MAP_API_KEY = "AIzaSyDgFGS91BvviXh_f-nmvtEggUHJcaGyUwA";

  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const decodePolyline = (encoded: string) => {
    const points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: lat / 1E5, longitude: lng / 1E5 });
    }
    return points;
  };

  useEffect(() => {
    const fetchDirections = async () => {
      const startLat = pickupLocation.latitude;
      const startLng = pickupLocation.longitude;
      const endLat = dropLocation.latitude;
      const endLng = dropLocation.longitude;

      try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&key=${MAP_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.routes && json.routes.length > 0) {
          const points = decodePolyline(json.routes[0].overview_polyline.points);
          setRouteCoords(points);

          const leg = json.routes[0].legs?.[0];
          if (leg) {
            setDistance(leg.distance?.text || "4.2 km");
            setDuration(leg.duration?.text || "15 min");
          }
        } else {
          setRouteCoords([
            { latitude: startLat, longitude: startLng },
            { latitude: endLat, longitude: endLng }
          ]);
          const rawDist = calculateHaversineDistance(startLat, startLng, endLat, endLng);
          const roadDist = rawDist * 1.35;
          setDistance(`${roadDist.toFixed(1)} km`);
          setDuration(`${Math.round((roadDist / 30) * 60)} min`);
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
        setRouteCoords([
          { latitude: startLat, longitude: startLng },
          { latitude: endLat, longitude: endLng }
        ]);
        const rawDist = calculateHaversineDistance(startLat, startLng, endLat, endLng);
        const roadDist = rawDist * 1.35;
        setDistance(`${roadDist.toFixed(1)} km`);
        setDuration(`${Math.round((roadDist / 30) * 60)} min`);
      }
    };

    fetchDirections();
  }, [selectedAddress, selectedAddress2, delivery]);

  const handleMapReady = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
          { latitude: dropLocation.latitude, longitude: dropLocation.longitude }
        ],
        {
          edgePadding: { top: 100, right: 50, bottom: 350, left: 50 },
          animated: true,
        }
      );
    }
  };

  useEffect(() => {
    handleMapReady();
  }, [selectedAddress, selectedAddress2, routeCoords, delivery]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        loadingEnabled={true}
        showsCompass={false}
        customMapStyle={darkMapStyle}
        loadingBackgroundColor={color.primary}
        onMapReady={handleMapReady}
        initialRegion={{
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
          }}
          title="Pickup Location"
          description={pickupLocation.address}
        />

        <Marker
          coordinate={{
            latitude: dropLocation.latitude,
            longitude: dropLocation.longitude,
          }}
          title="Drop Location"
          description={dropLocation.address}
          pinColor="#FFD700"
        />

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor={color.primary}
            geodesic={true}
          />
        )}
      </MapView>

      <SafeAreaView style={styles.safeArea} pointerEvents="box-none">

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => setShowReportModal(true)}
          >
            <Text style={styles.reportButtonText}>Report</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          {/* Tracking Status Badge */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.05)'
          }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
              {delivery?.tracking_number ? `Tracking: ${delivery.tracking_number}` : "Active Duty Route"}
            </Text>
            <View style={{
              backgroundColor: delivery?.tracking_number ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6
            }}>
              <Text style={{
                color: delivery?.tracking_number ? '#3B82F6' : '#10B981',
                fontSize: 12,
                fontWeight: '600'
              }}>
                {delivery?.tracking_number ? "Order Selected" : "Active Trip"}
              </Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statLabel}>Estimated Time</Text>
              <Text style={styles.statValue}>{duration}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{distance}</Text>
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.addressSection}>
            {/* Pickup */}
            <View style={styles.addressRow}>
              <View style={styles.timelineContainer}>
                <View style={styles.dot} />
                <View style={styles.dashedLine} />
              </View>
              <View style={styles.addressTextWrapper}>
                <Text style={styles.addressLabel}>Pickup Location</Text>
                <Text style={styles.addressValue} numberOfLines={1}>
                  {pickupLocation.address}
                </Text>
              </View>
            </View>

            {/* Drop */}
            <View style={styles.addressRow}>
              <View style={styles.timelineContainer}>
                <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />
              </View>
              <View style={styles.addressTextWrapper}>
                <Text style={styles.addressLabel}>Drop Location</Text>
                <Text style={styles.addressValue} numberOfLines={1}>
                  {dropLocation.address}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate(ScreenNameEnum.RaceDetail as never, { deliveryId: delivery?.id } as never)}
          >
            <Image source={imageIndex.send} style={{ height: 20, width: 20, marginRight: 10 }} />
            <Text style={styles.buttonText}>Start Navigation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCall}
          >
            <Icon name="call-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.buttonText}>Call Client</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      <ReportIssueModal
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },


  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportButtonText: {
    color: '#FF4D4D',
    fontWeight: '700',
    fontSize: 14,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomCard: {
    backgroundColor: '#1C1F26',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 20,
    marginHorizontal: 10
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  addressSection: {
    marginBottom: 30,
  },
  addressRow: {
    flexDirection: 'row',
    minHeight: 45,
  },
  timelineContainer: {
    width: 20,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginTop: 6,
  },
  dashedLine: {
    width: 1,
    flex: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#4B5563',
    marginVertical: 4,
  },
  addressTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  addressValue: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: color.primary,
    borderRadius: 18,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: color.primary,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryMap;
