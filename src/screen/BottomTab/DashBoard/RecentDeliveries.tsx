import React from "react";
import {
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  View,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./DashboardStyle";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../component/common/CustomHeader";
import DeliveryCard from "../../../component/DeliveryCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_API } from "../../../api/APIRequest";
import { ENDPOINT } from "../../../api/endpoints";
import LoadingModal from "../../../component/LoadingModal";
import ScreenNameEnum from "../../../routes/screenName.enum";
import EmptyListMessage from "../../../component/EmptyListMessage";

const RecentDeliveries = ({ route }: any) => {
  const navigation = useNavigation();
  const { status } = route?.params || {};
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDeliveries();
    setRefreshing(false);
  };

  const getHeaderLabel = () => {
    switch (status) {
      case 'assigned': return 'Assigned Deliveries';
      case 'in_progress': return 'In Progress Deliveries';
      case 'delivered': return 'Completed Deliveries';
      default: return 'Recent Deliveries';
    }
  };

  const filteredDeliveries = deliveries.filter((item: any) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      item.tracking_number?.toLowerCase().includes(searchStr) ||
      item.client_name?.toLowerCase().includes(searchStr) ||
      item.shipment_status_label?.toLowerCase().includes(searchStr)
    );
  });

  const fetchDeliveries = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const endpoint = status ? `${ENDPOINT.DELIVERIES}?status=${status}` : ENDPOINT.DELIVERIES;
      const response = await GET_API(endpoint, token, "GET", setLoading);
      if (response && response.success) {
        setDeliveries(response.data);
      }
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [status]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#010A16' }]}>
      <StatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      <CustomHeader
        label={getHeaderLabel()}
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />

      <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#111827',
          borderRadius: 12,
          paddingHorizontal: 15,
          height: 50,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.05)'
        }}>
          <Icon name="search-outline" size={20} color="#6F767E" />
          <TextInput
            style={{
              flex: 1,
              color: '#fff',
              marginLeft: 10,
              fontSize: 14
            }}
            placeholder="Search by tracking number, name..."
            placeholderTextColor="#6F767E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Icon name="close-circle" size={20} color="#6F767E" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredDeliveries}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#fff']}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(ScreenNameEnum.DELIVERY_DETAIL as never, { deliveryId: item.id } as never)}>
            <DeliveryCard
              id={item.tracking_number}
              date={item.expected_delivery}
              status={item.shipment_status_label}
              fromAddress={item.origin?.address}
              toAddress={item.destination?.address}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <EmptyListMessage
            message={`No ${getHeaderLabel().toLowerCase()} found.`}
            icon={status === 'delivered' ? 'checkmark-done-circle-outline' : 'cube-outline'}
          />
        }
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RecentDeliveries;
