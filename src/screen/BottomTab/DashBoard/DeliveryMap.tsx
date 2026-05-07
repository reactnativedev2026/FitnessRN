import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ReportIssueModal from '../../../compoent/ReportIssueModal';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

const DeliveryMap = () => {
  const navigation = useNavigation();
  const [showReportModal, setShowReportModal] = useState(false);

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Map Background */}
      <ImageBackground
        source={imageIndex.navigationMap}
        style={styles.mapBackground}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
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
            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statLabel}>Estimated Time</Text>
                <Text style={styles.statValue}>15 min</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.statLabel}>Distance</Text>
                <Text style={styles.statValue}>4.2 km</Text>
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
                    Sapphire House, 402 A, B, C, Sapna Sangeeta...
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
                    Shivampuri Colony, Indore, Madhya Pradesh 452014...
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate(ScreenNameEnum.RaceDetail as never)}
            >
              <Image source={imageIndex.send} style={{ height: 20, width: 20, marginRight: 10 }} />
              <Text style={styles.buttonText}>Start Navigation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Icon name="call-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Call Client</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>

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
  mapBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
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
