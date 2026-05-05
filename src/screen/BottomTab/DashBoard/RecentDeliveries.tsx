import React from "react";
import {
  StatusBar,
  FlatList,
  View,
} from "react-native";
import { styles } from "./DashboardStyle";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../compoent/CustomHeader";
import DeliveryCard from "../../../compoent/DeliveryCard";

const RecentDeliveries = () => {
  const navigation = useNavigation();

  const deliveryData = [
    { id: '#5R9G87R', date: '14 May 2025', status: 'In Progress' },
    { id: '#5R9G87R', date: '14 May 2025', status: 'Completed' },
    { id: '#8K2L45P', date: '12 May 2025', status: 'Completed' },
    { id: '#3M1N90Q', date: '10 May 2025', status: 'Completed' },
    { id: '#7V6B43X', date: '08 May 2025', status: 'Completed' },
    { id: '#2W9Z54Y', date: '06 May 2025', status: 'Completed' },
    { id: '#9P3O21K', date: '04 May 2025', status: 'Completed' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#010A16' }]}>
      <StatusBar barStyle="light-content" />
      <CustomHeader
        label='Recent Deliveries'
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />
      
      <FlatList
        data={deliveryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <DeliveryCard
            id={item.id}
            date={item.date}
            status={item.status}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default RecentDeliveries;
