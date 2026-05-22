import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { color } from "../../../constant";
import { styles } from "./DashboardStyle";
import { useNavigation } from "@react-navigation/native";
import DetailDeliveryCard from "../../../component/DetailDeliveryCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../component/common/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import ScreenNameEnum from "../../../routes/screenName.enum";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_API } from '../../../api/APIRequest';
import { ENDPOINT } from '../../../api/endpoints';
import LoadingModal from '../../../utils/Loader';

const DashboardDetail = ({ route }: any) => {
  const navigation = useNavigation();
  const { type } = route.params;
  const [activeTab, setActiveTab] = useState<'Assigned' | 'Completed'>('Assigned');
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState<any[]>([]);

  const fetchDeliveries = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      const response = await GET_API(ENDPOINT.DELIVERIES, token, "GET", setLoading);
      if (response && response.success) {
        setDeliveries(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const filteredData = deliveries.filter(item => {
    if (activeTab === 'Assigned') {
      return item.shipment_status !== 'delivered';
    } else {
      return item.shipment_status === 'delivered';
    }
  });
  return (
    <SafeAreaView style={[styles.container,]}>
      <StatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />

      <CustomHeader
        label={type === 'start' ? 'Start Delivery' : 'Update Status'}
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />

      {/* Tabs */}
      <View style={[styles.tabContainer, { marginHorizontal: 20 }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Assigned' && { backgroundColor: color.primary }]}
          onPress={() => setActiveTab('Assigned')}
        >
          <Text style={[styles.tabText, activeTab === 'Assigned' && { color: '#fff' }]}>
            Assigned
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Completed' && { backgroundColor: color.primary }]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabText, activeTab === 'Completed' && { color: '#fff' }]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }}>
        {filteredData.map((item, index) => (
          <DetailDeliveryCard
            key={index}
            id={item.tracking_number || item.id}
            name={item.client_name || 'Unknown'}
            status={item.shipment_status === 'delivered' ? 'Completed' : 'Assigned'}
            pickupAddress={item.origin?.address || item.pickup_location || ''}
            dropAddress={item.destination?.address || item.drop_location || ''}
            onPressStart={() => navigation.navigate(ScreenNameEnum.MapScreen as never, { delivery: item } as never)}
            onPressMenu={() => console.log('Menu', item.id)}
            onPress={() => navigation.navigate(ScreenNameEnum.DELIVERY_DETAIL as never, { deliveryId: item.id } as never)}
          />
        ))}
        {filteredData.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: '#6F767E', fontSize: 16 }}>No deliveries found</Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardDetail; 
