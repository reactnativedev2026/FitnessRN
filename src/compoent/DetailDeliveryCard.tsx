import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../constant';
import imageIndex from '../assets/imageIndex';

interface DetailDeliveryCardProps {
  id: string;
  name: string;
  status: 'Assigned' | 'Completed';
  pickupAddress: string;
  dropAddress: string;
  onPressStart?: () => void;
  onPressMenu?: () => void;
}

const DetailDeliveryCard: React.FC<DetailDeliveryCardProps> = ({
  id,
  name,
  status,
  pickupAddress,
  dropAddress,
  onPressStart,
  onPressMenu,
}) => {
  const isCompleted = status === 'Completed';

  return (
    <View style={styles.cardContainer}>
      {/* Top Status Section */}
      <View style={styles.headerRow}>
        <View style={styles.statusBadge}>
          {/* <View style={styles.iconContainer}>
            <Image 
              source={imageIndex.box} 
              style={[styles.boxIcon, { tintColor: isCompleted ? '#2CC59D' : '#FF9F43' }]} 
              resizeMode="contain" 
            />
          </View> */}
          <Image
            source={imageIndex.box}
            style={[styles.boxIcon,]}
            resizeMode="contain"
          />
          <Text style={[styles.statusText, { color: isCompleted ? '#2CC59D' : '#FF9F43' }]}>
            {status}
          </Text>
        </View>
      </View>

      {/* Name and ID Section */}
      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>
            {name} <Text style={styles.idText}>• {id}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={onPressMenu}>
          <Icon name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Address Section */}
      <View style={styles.addressContainer}>
        {/* Pickup */}
        <View style={styles.addressRow}>
          <View style={styles.timelineContainer}>
            <View style={styles.dot} />
            <View style={styles.dashedLine} />
          </View>
          <View style={styles.addressTextWrapper}>
            <Text style={styles.addressLabel}>Pickup</Text>
            <Text style={styles.addressValue} numberOfLines={2}>{pickupAddress}</Text>
          </View>
        </View>

        {/* Drop */}
        <View style={styles.addressRow}>
          <View style={styles.timelineContainer}>
            <View style={[styles.dot, { backgroundColor: color.primary }]} />
          </View>
          <View style={styles.addressTextWrapper}>
            <Text style={styles.addressLabel}>Drop</Text>
            <Text style={styles.addressValue} numberOfLines={2}>{dropAddress}</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      {!isCompleted && (
        <TouchableOpacity style={styles.startButton} onPress={onPressStart}>
          <Text style={styles.startButtonText}>Start Delivery</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  boxIcon: {
    width: 40,
    height: 40,
    marginRight: 15
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  idText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '400',
  },
  addressContainer: {
    marginBottom: 20,
  },
  addressRow: {
    flexDirection: 'row',
    minHeight: 50,
  },
  timelineContainer: {
    width: 20,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  dashedLine: {
    width: 1,
    flex: 1,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#374151',
    marginVertical: 4,
  },
  addressTextWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  addressValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: color.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DetailDeliveryCard;
