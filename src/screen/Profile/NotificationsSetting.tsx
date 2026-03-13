import React, { useState } from "react";
import { View, Text, Switch, FlatList, StyleSheet } from "react-native";
import CustomHeader from "../../compoent/CustomHeader";
import imageIndex from "../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import { color } from "../../constant";

const NotificationsSetting = () => {
  // All switch states in single object
  const [settings, setSettings] = useState({
    generalNotification: true,
    sound: false,
    vibrate: false,
    appUpdates: true,
    newTips: false,
  });

  // Notification list config
  const notificationOptions = [
    { key: "generalNotification", label: "General Notification" },
    { key: "sound", label: "Sound" },
    { key: "vibrate", label: "Vibrate" },
    { key: "appUpdates", label: "App Updates" },
    { key: "newTips", label: "New Tips Available" },
  ];

  const handleToggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

 const renderItem = ({ item }) => (
  <View style={styles.notificationOption}>
    <Text style={styles.optionText}>{item.label}</Text>

    <Switch
      value={settings[item.key]}
      onValueChange={() => handleToggle(item.key)}
      trackColor={{ false: '#E5E7EB', true: color.primary }}
      thumbColor={settings[item.key] ? '#FFFFFF' : '#FFFFFF'}
      ios_backgroundColor="#E5E7EB"
    />
  </View>
);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBarComponent />
      <CustomHeader
       label="Notifications"  />

      <FlatList
        data={notificationOptions}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 40, marginHorizontal: 15 }}
      />
    </SafeAreaView>
  );
};

export default NotificationsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  switchContainer: {
    width: 45,
    height: 27,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "transparent",
    padding: 2,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    right: 7,
  },
  notificationOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#1D3A70",
    // fontFamily: fonts.bold,
    lineHeight: 15,
  },
});
