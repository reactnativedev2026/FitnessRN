import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import CustomHeader from '../../../compoent/CustomHeader';

import { launchCamera } from 'react-native-image-picker';
import { requestCameraPermissions } from '../../../api';
import SignaturePad from '../../../compoent/SignaturePad';
import Svg, { Path } from 'react-native-svg';
import ReportIssueModal from '../../../compoent/ReportIssueModal';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

type OrderStatus = 'Assigned' | 'Accepted' | 'Arrived' | 'Delivered';

const OrderDetails = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState<OrderStatus>('Assigned');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const renderTimeline = (isModal = false) => {
    const steps = [
      { id: 'Assigned', label: 'Assigned', activeIcon: imageIndex.step1, inactiveIcon: imageIndex.step1 },
      { id: 'Accepted', label: 'Accepted', activeIcon: imageIndex.step2f, inactiveIcon: imageIndex.step2 },
      { id: 'Arrived', label: 'Arrived', activeIcon: imageIndex.step3f, inactiveIcon: imageIndex.step3 },
      { id: 'Delivered', label: 'Delivered', activeIcon: imageIndex.step4f, inactiveIcon: imageIndex.step4 },
    ];

    const getStatusIndex = (s: OrderStatus) => steps.findIndex(step => step.id === s);
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

      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: false,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        alert('Error: ' + result.errorMessage);
      } else if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setCapturedPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Photo capture error:', error);
      alert('An unexpected error occurred while taking the photo.');
    }
  };

  const handleNextStatus = () => {
    if (status === 'Assigned') setStatus('Accepted');
    else if (status === 'Accepted') {
      setStatus('Arrived');
      setShowDeliveryForm(true);
    }
    // else if (status === 'Arrived')

  };

  const handleReportSubmit = (data: any) => {
    console.log('Issue Reported:', data);
    // Add API call here if needed
    setShowReportModal(false);
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Issue reported successfully! 👋',
      });
    }, 500);
  };

  const isFormValid = receiverName.trim() !== '' && signature !== null;

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.infoLabel}>Pickup Location</Text>
            <Text style={styles.infoValue}>1234 Elm Street Springfield, IL 62701</Text>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>Rahul Verma</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Receiver Name</Text>
                <Text style={styles.infoValue}>Ayesha Khan</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Postal Code</Text>
                <Text style={styles.infoValue}>452001</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Receiver Phone Number</Text>
                <Text style={styles.infoValue}>+91 98765 43210</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Height</Text>
                <Text style={styles.infoValue}>4.5 ft</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.infoLabel}>Weight</Text>
                <Text style={styles.infoValue}>6.2 kg</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
              <Text style={styles.infoLabel}>Pickup Address </Text>
              <Icon name="copy-outline" size={16} color="#fff" />
            </View>
            <Text style={styles.infoValue}>
              Indrapuri Colony, Bhawar Kuan, Indore, Madhya Pradesh - 452001
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
            <TouchableOpacity style={styles.googleMapsButton}>
              <Image source={imageIndex.viewMap} style={{ height: 20, width: 20, marginRight: 10, tintColor: '#fff' }} />
              <Text style={styles.buttonText}>Open in Google Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callButton}>
              <Icon name="call-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Call Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#34C759' }]}
              onPress={handleNextStatus}
            >
              <Text style={styles.actionButtonText}>
                {status === 'Assigned' ? 'Mark as Accepted' : status === 'Accepted' ? 'Mark Arrived' : 'Mark as Delivered'}
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
              onPress={() => {
                setStatus('Delivered');
                setShowDeliveryForm(false);
                setShowSuccessModal(true);
              }}
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

        {/* Success Modal */}
        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successModalContent}>
              <Text style={styles.timerText}>3 seconds!</Text>

              <Image source={imageIndex.success} style={styles.successIcon} />

              <Text style={styles.successTitle}>Delivery Complete!</Text>

              <View style={styles.modalStatusSection}>
                <Text style={styles.modalSectionTitle}>Order Status</Text>
                <Text style={styles.modalSectionSubtitle}>System generated timeline</Text>
                {renderTimeline(true)}
              </View>

              <View style={styles.stopCard}>
                <Text style={styles.stopNumber}>Stop #1</Text>
                <Text style={styles.stopName}>Craig Carder</Text>
                <Text style={styles.stopAddress}>123 Oak Street, Apt 4B</Text>
              </View>

              <View style={styles.stopCard}>
                <Text style={styles.nextStopLabel}>Next Stop</Text>
                <Text style={styles.stopName}>Michael Chen</Text>
                <Text style={styles.stopAddress}>456 Maple Avenue, Suite 200</Text>
              </View>

              <TouchableOpacity style={styles.modalPrimaryButton}>
                <Text style={styles.buttonText}>Go to Next Stop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSecondaryButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>Back to Route List</Text>
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
