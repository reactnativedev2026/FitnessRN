import React from 'react';
import { View, Text, Image } from 'react-native';
import { color } from '../constant';
import imageIndex from '../assets/imageIndex';
import { styles as dashboardStyles } from '../screen/BottomTab/DashBoard/DashboardStyle';
import moment from 'moment';

interface DeliveryCardProps {
  id: string;
  date: string;
  status: string;
  fromAddress?: string;
  toAddress?: string;
  pickupLabel?: string;
  dropLabel?: string;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  id,
  date,
  status,
  fromAddress = "1234 Elm Street Springfield, IL 62701",
  toAddress = "5678 Maple Avenue Seattle, WA 98101",
  pickupLabel = "From",
  dropLabel = "To",
}) => {
  return (
    <View style={dashboardStyles.deliveryCard}>
      <View style={dashboardStyles.cardTop}>
        <View style={dashboardStyles.orderInfo}>
          <Image source={imageIndex.box} style={{ width: 40, height: 40, marginRight: 10 }} />
          <View>
            <Text style={dashboardStyles.orderId}>
              {id}
              {/* <Text style={{ color: '#6F767E', fontSize: 12 }}>  •  </Text> */}

            </Text>
            <Text style={dashboardStyles.orderDate}>{moment(date).format('DD MMM YYYY')}</Text>
          </View>

        </View>
        <Text style={[dashboardStyles.statusBadge, { color: status === 'Completed' ? '#2CC59D' : color.primary }]}>
          {status}
        </Text>
      </View>

      <View style={dashboardStyles.addressSection}>
        {/* Pickup Address Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, alignItems: 'center' }}>
            <View style={dashboardStyles.dot} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={dashboardStyles.addressLabel}>{pickupLabel}</Text>
            <Text style={dashboardStyles.addressText} numberOfLines={2}>
              {fromAddress}
            </Text>
          </View>
        </View>

        {/* Dotted Line Spacer Row */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 20, alignItems: 'center', height: 30, justifyContent: 'space-evenly', marginVertical: 2 }}>
            <View style={dashboardStyles.smallDot} />
            <View style={dashboardStyles.smallDot} />
            <View style={dashboardStyles.smallDot} />
            <View style={dashboardStyles.smallDot} />
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Drop Address Row */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 20, alignItems: 'center' }}>
            <View style={[dashboardStyles.dot, { backgroundColor: color.primary }]} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={dashboardStyles.addressLabel}>{dropLabel}</Text>
            <Text style={dashboardStyles.addressText}>{toAddress}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryCard;