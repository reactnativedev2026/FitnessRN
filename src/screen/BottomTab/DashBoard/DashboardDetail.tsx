import React, { useState } from "react";
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
import DetailDeliveryCard from "../../../compoent/DetailDeliveryCard";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import ScreenNameEnum from "../../../routes/screenName.enum";

const DashboardDetail = ({ route }: any) => {
  const navigation = useNavigation();
  const { type } = route.params;
  const [activeTab, setActiveTab] = useState<'Assigned' | 'Completed'>('Assigned');

  const deliveryData = [
    {
      id: 'TRK-1001',
      name: 'Sarah Johnson',
      date: '14 May 2025',
      status: 'Assigned' as const,
      pickup: '1234 Elm Street Springfield, IL 62701',
      drop: '5678 Maple Avenue Seattle, WA 98101'
    },
    {
      id: 'TRK-1002',
      name: 'Mike Ross',
      date: '14 May 2025',
      status: 'Assigned' as const,
      pickup: '789 Oak Lane, Denver, CO 80202',
      drop: '321 Pine St, Austin, TX 78701'
    },
    {
      id: 'TRK-1003',
      name: 'Harvey Specter',
      date: '12 May 2025',
      status: 'Completed' as const,
      pickup: '601 Lexington Ave, New York, NY 10022',
      drop: '500 W 2nd St, Austin, TX 78701'
    },
  ];

  const filteredData = deliveryData.filter(item => item.status === activeTab);

  return (
    <SafeAreaView style={[styles.container,]}>
      <StatusBar barStyle="light-content" />

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
            id={item.id}
            name={item.name}
            status={item.status}
            pickupAddress={item.pickup}
            dropAddress={item.drop}
            onPressStart={() => navigation.navigate(ScreenNameEnum.MapScreen as never)}
            onPressMenu={() => console.log('Menu', item.id)}
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
