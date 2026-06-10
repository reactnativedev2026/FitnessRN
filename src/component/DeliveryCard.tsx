import React from 'react';
import { View, Text, Image } from 'react-native';
import { color } from '../theme/colors';
import imageIndex from '../assets/imageIndex';
import { styles as dashboardStyles } from '../screen/BottomTab/Dashboard/DashboardStyle';
import moment from 'moment';

interface DeliveryCardProps {
  id: string;
  date: string;
  status: string;
  fromAddress?: string;
  toAddress?: string;
  pickupLabel?: string;
  dropLabel?: string;
  clientName?: string;
  saplername?: string;
  companyName?: string;
  boxcount?: string
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  id,
  date,
  status,
  fromAddress = "1234 Elm Street Springfield, IL 62701",
  toAddress = "5678 Maple Avenue Seattle, WA 98101",
  pickupLabel = "From",
  dropLabel = "To",
  clientName,
  saplername,
  companyName,
  boxcount
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
            <Text style={dashboardStyles.orderDate}>{date && moment(date).format('DD MMM YYYY')}</Text>
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
            {saplername && <Text style={[dashboardStyles.addressText, {
              fontSize: 14,
              color: color.primary
            }]}>{saplername}</Text>}
            <Text style={dashboardStyles.addressText} numberOfLines={2}>
              {fromAddress}
            </Text>
          </View>
        </View>

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
            {clientName && <Text style={[dashboardStyles.addressText, {
              fontSize: 14,
              color: color.primary
            }]}>{clientName}</Text>}


            <Text style={dashboardStyles.addressText}>{toAddress}</Text>
          </View>
        </View>
      </View>
      {companyName ? (
        <View style={{ marginTop: 10 }}>
          <Text
            style={[
              dashboardStyles.addressText,
              {
                fontSize: 13,
                color: color.white,
              },
            ]}
          >
            <Text style={{ fontWeight: '600', color: color.white }}>
              Company Name :
            </Text>
            <Text
              style={{
                fontWeight: '400',
                color: color.primary,
                textTransform: 'capitalize',
              }}
            >
              {' '}{companyName}
            </Text>
          </Text>
        </View>
      ) : null}

      {boxcount ? (
        <View style={{ marginTop: 5, marginBottom: 5 }}>
          <Text
            style={[
              dashboardStyles.addressText,
              {
                fontSize: 13,

                color: color.white,
              },
            ]}
          >
            <Text style={{ fontWeight: '600', color: color.white }}>
              Box Count :
            </Text>
            <Text
              style={{
                fontWeight: '400',
                color: color.primary,
              }}
            >
              {' '}{boxcount}
            </Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default DeliveryCard;