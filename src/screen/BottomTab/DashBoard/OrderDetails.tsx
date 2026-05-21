import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Modal,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../component/CustomHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermissions } from '../../../api';
import SignaturePad from '../../../component/SignaturePad';
import Svg, { Path } from 'react-native-svg';
import ReportIssueModal from '../../../component/ReportIssueModal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_API, POST_API } from '../../../api/APIRequest';
import { ENDPOINT } from '../../../api/endpoints';
import LoadingModal from '../../../utils/Loader';
import Clipboard from '@react-native-clipboard/clipboard';

const { width } = Dimensions.get('window');

type OrderStatus = 'Assigned' | 'Started' | 'Arrived' | 'Delivered';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { deliveryId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState<any>(null);
  const [status, setStatus] = useState<OrderStatus>('Assigned');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedPhotoBase64, setCapturedPhotoBase64] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('Delivered at reception');
  const [signature, setSignature] = useState<string | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    if (deliveryId) {
      fetchDeliveryDetail();
    }
  }, [deliveryId]);

  const fetchDeliveryDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      console.log("Fetch Delivery Detail Request ID:", deliveryId);
      const response = await GET_API(`${ENDPOINT.DELIVERY_DETAIL}${deliveryId}`, token, "GET", setLoading);
      console.log("Fetch Delivery Detail Response:", response);

      if (response && response.success) {
        setDelivery(response.data);
        const apiStatus = response.data?.shipment_status?.toLowerCase();
        if (apiStatus === 'assigned' || apiStatus === 'accepted') setStatus('Assigned');
        else if (apiStatus === 'started' || apiStatus === 'out_for_delivery') setStatus('Started');
        else if (apiStatus === 'arrived') setStatus('Arrived');
        else if (apiStatus === 'delivered') setStatus('Delivered');
      }
    } catch (error) {
      console.error("Error fetching delivery detail:", error);
    }
  };

  const handleNextStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      if (status === 'Assigned') {
        console.log("Start Delivery Request URL:", `${ENDPOINT.START_DELIVERY}${deliveryId}/start`);
        const res = await POST_API(token, {}, `${ENDPOINT.START_DELIVERY}${deliveryId}/start`, setLoading, false);
        console.log("Start Delivery Response:", res);
        if (res && res.success) {
          setStatus('Started');
          Toast.show({ type: 'success', text1: 'Success', text2: 'Delivery Started!' });
        }
      } else if (status === 'Started') {
        console.log("Arrive Delivery Request URL:", `${ENDPOINT.DELIVERY_DETAIL}${deliveryId}/arrive`);
        const res = await POST_API(token, {}, `${ENDPOINT.DELIVERY_DETAIL}${deliveryId}/arrive`, setLoading, false);
        console.log("Arrive Delivery Response:", res);
        if (res && res.success) {
          setStatus('Arrived');
          Toast.show({ type: 'success', text1: 'Success', text2: 'Arrived at Location!' });
        }
      } else if (status === 'Arrived') {
        setShowDeliveryForm(true);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const btoa = (input: string) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let str = input;
    let output = '';
    for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
      charCode = str.charCodeAt(i += 3 / 4);
      block = block << 8 | charCode;
    }
    return output;
  };

  const handleSubmitComplete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      let dynamicSignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      if (signature) {
        try {
          const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><path d="${signature}" stroke="black" stroke-width="3" fill="none"/></svg>`;
          dynamicSignature = `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
        } catch (e) {
          console.error("Error encoding signature:", e);
        }
      }

      const payload = {
        receiver_name: receiverName,
        receiver_signature: dynamicSignature,
        proof_photo: capturedPhotoBase64 || "",
        notes: deliveryNotes
      };

      console.log("Submit Complete Payload:", payload);
      const res = await POST_API(token, payload, `${ENDPOINT.DELIVERY_DETAIL}${deliveryId}/complete`, setLoading, false);
      console.log("Submit Complete Response:", res);

      if (res && res.success) {
        setStatus('Delivered');
        setShowDeliveryForm(false);
        setShowSuccessModal(true);
        Toast.show({ type: 'success', text1: 'Success', text2: 'Delivery Completed Successfully!' });
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: res?.message || 'Failed to complete delivery.' });
      }
    } catch (error) {
      console.error("Error completing delivery:", error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'An unexpected error occurred.' });
    }
  };

  const handleReportSubmit = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      console.log("Report Issue Payload:", data);
      const response = await POST_API(
        token,
        data,
        `${ENDPOINT.REPORT_ISSUE}${deliveryId}/issue`,
        setLoading,
        false
      );
      console.log("Report Issue Response:", response);

      if (response && response.success) {
        setShowReportModal(false);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Issue reported successfully! 👋',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to report issue.',
        });
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred.',
      });
    }
  };

  const handleOpenMaps = () => {
    const { latitude, longitude } = delivery?.destination || {};
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${delivery?.destination?.address}`);
    }
  };

  const handleCall = () => {
    const phone = delivery?.contact_phone;
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleCopyAddress = (address: string) => {
    if (!address) return;
    Clipboard.setString(address);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      text2: 'Address copied to clipboard!',
    });
  };

  const renderTimeline = (isModal = false) => {
    const steps = [
      { id: 'Assigned', label: 'Assigned', activeIcon: imageIndex.step1, inactiveIcon: imageIndex.step1 },
      { id: 'Started', label: 'Started', activeIcon: imageIndex.step2f, inactiveIcon: imageIndex.step2 },
      { id: 'Arrived', label: 'Arrived', activeIcon: imageIndex.step3f, inactiveIcon: imageIndex.step3 },
      { id: 'Delivered', label: 'Delivered', activeIcon: imageIndex.step4f, inactiveIcon: imageIndex.step4 },
    ];

    const getStatusIndex = (s: OrderStatus) => {
      if (s === 'Assigned') return 0;
      if (s === 'Started') return 1;
      if (s === 'Arrived') return 2;
      if (s === 'Delivered') return 3;
      return 0;
    };
    const currentIndex = isModal ? 3 : getStatusIndex(status);

    return (
      <View style={[styles.timelineContainer, isModal && { paddingHorizontal: 0 }]}>
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          return (
            <React.Fragment key={step.id}>
              <View style={styles.timelineStep}>
                <Image
                  source={isActive ? step.activeIcon : step.inactiveIcon}
                  style={[styles.stepIcon, isModal && { width: 35, height: 35 }]}
                  resizeMode="contain"
                />
                <Text style={[styles.stepLabel, { color: isActive ? (isModal ? '#3E8BFF' : color.primary) : '#6F767E' }, isModal && { fontSize: 8 }]}>
                  {step.label}
                </Text>
              </View>
              {index < steps.length - 1 && (
                <View style={[styles.timelineLine, { backgroundColor: index < currentIndex ? (isModal ? '#3E8BFF' : color.primary) : '#393B48' }, isModal && { marginTop: -15 }]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const handleTakePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        alert('Camera permission is required to take photos.');
        return;
      }

      const image = await ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        cropping: true,
        compressImageQuality: 0.5,
        includeBase64: true,
      });

      if (image && image.path) {
        setCapturedPhoto(image.path);
        if (image.data) {
          setCapturedPhotoBase64(`data:${image.mime};base64,${image.data}`);
        }
      }
    } catch (error: any) {
      if (error.code === 'E_PICKER_CANCELLED') {
        console.log('User cancelled image picker');
      } else {
        console.error('Photo capture error:', error);
        alert('An unexpected error occurred while taking the photo.');
      }
    }
  };

  const isFormValid = receiverName.trim() !== '' && signature !== null;

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loading} />
      <CustomHeader
        label='Order Details'
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Order Info Card */}
        <View style={styles.orderCard}>
          <View style={styles.blueBoxOverlay}>
            <Image source={imageIndex.bluebox} style={styles.blueBoxIcon} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.infoLabel}>Tracking ID: {delivery?.tracking_number}</Text>
            <Text style={styles.infoValue}>{delivery?.origin?.address}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Client Name</Text>
                <Text style={styles.infoValue}>{delivery?.client_name || 'N/A'}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Receiver Name</Text>
                <Text style={styles.infoValue}>{delivery?.contact_person || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Postal Code</Text>
                <Text style={styles.infoValue}>{delivery?.origin?.postcode || 'N/A'}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Receiver Phone</Text>
                <Text style={styles.infoValue}>{delivery?.contact_phone || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Package Type</Text>
                <Text style={styles.infoValue}>{delivery?.package_type || 'N/A'}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Quantity</Text>
                <Text style={styles.infoValue}>{delivery?.quantity || '0'} Units</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <Text style={styles.infoLabel}>Drop Address </Text>
              <TouchableOpacity onPress={() => handleCopyAddress(delivery?.destination?.address)}>
                <Icon name="copy-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoValue}>
              {delivery?.destination?.address}
            </Text>
          </View>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <Text style={styles.sectionSubtitle}>System generated timeline</Text>
          {renderTimeline()}
        </View>

        {/* Action Buttons or Form */}
        {!showDeliveryForm ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.googleMapsButton} onPress={handleOpenMaps}>
              <Image source={imageIndex.viewMap} style={{ height: 20, width: 20, marginRight: 10, tintColor: '#fff' }} />
              <Text style={styles.buttonText}>Open in Google Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Icon name="call-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Call Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#34C759' }]}
              onPress={handleNextStatus}
            >
              <Text style={styles.actionButtonText}>
                {status === 'Assigned'
                  ? 'Start Delivery'
                  : status === 'Started'
                    ? 'Mark Arrived'
                    : 'Mark as Delivered'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Receiver Details Required</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Receiver Name <Text style={{ color: 'red' }}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Enter receiver name"
                placeholderTextColor="#6F767E"
                value={receiverName}
                onChangeText={setReceiverName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Delivery Notes</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter delivery notes"
                placeholderTextColor="#6F767E"
                value={deliveryNotes}
                onChangeText={setDeliveryNotes}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Receiver Signature <Text style={{ color: 'red' }}>*</Text></Text>
              <TouchableOpacity style={styles.signaturePad} onPress={() => setShowSignatureModal(true)}>
                {signature ? (
                  <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Svg width="100%" height="100%" viewBox={`0 0 ${width - 60} 300`}>
                      <Path d={signature} stroke="black" strokeWidth={3} fill="none" />
                    </Svg>
                  </View>
                ) : (
                  <Text style={{ color: color.primary }}>Sign Here</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.photoContainer}>
              <Text style={[styles.inputLabel, { textAlign: 'center' }]}>Upload Photo (Optional)</Text>
              {capturedPhoto ? (
                <View style={{ alignItems: 'center' }}>
                  <Image source={{ uri: capturedPhoto }} style={{ width: 150, height: 150, borderRadius: 10, marginBottom: 10 }} />
                  <TouchableOpacity onPress={handleTakePhoto}>
                    <Text style={{ color: color.primary }}>Retake Photo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.takePhotoButton} onPress={handleTakePhoto}>
                  <Text style={{ color: '#000', fontWeight: '600' }}>Take Photo</Text>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.formFooter}>Receiver name and signature are required.</Text>

            <TouchableOpacity
              style={[styles.submitButton, isFormValid && { backgroundColor: '#2CC59D' }]}
              disabled={!isFormValid}
              onPress={handleSubmitComplete}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={showSignatureModal}
          transparent={true}
          animationType="slide"
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Receiver Signature</Text>
                <TouchableOpacity onPress={() => setShowSignatureModal(false)}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <SignaturePad
                onSave={(path) => {
                  setSignature(path);
                  setShowSignatureModal(false);
                }}
                onClear={() => setSignature(null)}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successModalContent}>
              {/* <Text style={styles.timerText}>3 seconds!</Text> */}

              <Image source={imageIndex.success} style={styles.successIcon} />
              <Text style={styles.successTitle}>Delivery Complete!</Text>

              <View style={styles.modalStatusSection}>
                <Text style={styles.modalSectionTitle}>Order Status</Text>
                <Text style={styles.modalSectionSubtitle}>System generated timeline</Text>
                {renderTimeline(true)}
              </View>

              <View style={styles.stopCard}>
                <Text style={styles.stopNumber}>Order Tracking: {delivery?.tracking_number}</Text>
                <Text style={styles.stopName}>{delivery?.contact_person}</Text>
                <Text style={styles.stopAddress}>{delivery?.destination?.address}</Text>
              </View>

              <View style={styles.stopCard}>
                <Text style={styles.nextStopLabel}>Next Stop</Text>
                <Text style={styles.stopName}>Route List</Text>
                <Text style={styles.stopAddress}>Return to your dashboard for next tasks.</Text>
              </View>

              <TouchableOpacity
                style={styles.modalPrimaryButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.replace(ScreenNameEnum.DashBoardScreen as any);
                }}
              >
                <Text style={styles.buttonText}>Go to Next task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {status !== 'Delivered' && !showDeliveryForm && (
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 20 }}
            onPress={() => setShowReportModal(true)}
          >
            <Text style={{ color: '#FF4D4D', fontWeight: '600' }}>Report Issue</Text>
          </TouchableOpacity>
        )}

        <ReportIssueModal
          visible={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  orderCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 40,
    padding: 20,
    paddingTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  blueBoxOverlay: {
    position: 'absolute',
    top: -40,
    left: (width - 40 - 80) / 2, // center overlay on card
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  blueBoxIcon: {
    width: 80,
    height: 80,
  },
  cardContent: {
    marginTop: 10,
  },
  infoLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
  statusSection: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#6F767E',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timelineStep: {
    alignItems: 'center',
    zIndex: 2,
  },
  stepIcon: {
    width: 45,
    height: 45,
  },
  stepLabel: {
    fontSize: 10,
    marginTop: 8,
    fontWeight: '500',
  },
  timelineLine: {
    flex: 1,
    height: 2,
    marginTop: -20, // Align with center of icons
    zIndex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  googleMapsButton: {
    backgroundColor: '#035093',
    borderRadius: 16,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  callButton: {
    backgroundColor: color.primary,
    borderRadius: 16,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  actionButton: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#111827',
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  formHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1C2533',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    color: '#fff',
  },
  signaturePad: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    backgroundColor: '#1C2533',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  takePhotoButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10
  },
  formFooter: {
    color: '#6F767E',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20
  },
  submitButton: {
    backgroundColor: '#9CA3AF', // Gray until filled? Or just use primary
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalContent: {
    backgroundColor: '#050B18',
    width: '100%',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  timerText: {
    color: '#FF4D4D',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 20,
  },
  successIcon: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },
  successTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 30,
  },
  modalStatusSection: {
    width: '100%',
    marginBottom: 25,
  },
  modalSectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalSectionSubtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 15,
  },
  stopCard: {
    backgroundColor: '#23262F',
    width: '100%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  stopNumber: {
    color: '#3E8BFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  nextStopLabel: {
    color: '#3E8BFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  stopName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  stopAddress: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  modalPrimaryButton: {
    backgroundColor: color.primary,
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalSecondaryButton: {
    backgroundColor: '#23262F',
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  }
});


export default OrderDetails;
