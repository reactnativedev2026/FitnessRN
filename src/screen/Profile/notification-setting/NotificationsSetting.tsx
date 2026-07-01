import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AppSafeAreaView from "../../../component/common/AppSafeAreaView";
import StatusBarComponent from "../../../component/common/StatusBarCompoent";
import ScreenHeader from "../../../component/common/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import LoadingModal from "../../../component/LoadingModal";
import { BASE_URL } from "../../../api";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { AppThemeColors } from "../../../theme/colors";
import CommonToggleSwitch from "../../../component/common/CommonToggleSwitch";

const NotificationsSetting = () => {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  const { token } = useSelector((state: RootState) => state.auth);
  const [initialLoading, setInitialLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // All switch states in single object matching API keys
  const [settings, setSettings] = useState({
    notification_enabled: false,
    sound_enabled: false,
    vibrate_enabled: false,
    app_updates_enabled: false,
  });

  // Notification list config matching API keys
  const notificationOptions = [
    { key: "notification_enabled", label: "General Notification" },
    { key: "sound_enabled", label: "Sound" },
    { key: "vibrate_enabled", label: "Vibrate" },
    { key: "app_updates_enabled", label: "App Updates" },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setInitialLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      const response = await fetch(`${BASE_URL}settings`, requestOptions);
      const result = await response.json();
      console.log("Get Settings API Response:", result);

      if (response.ok && result.data) {
        setSettings({
          notification_enabled: !!result.data.notification,
          sound_enabled: !!result.data.sound,
          vibrate_enabled: !!result.data.vibrate,
          app_updates_enabled: !!result.data.app_updates,
        });
      }
    } catch (error) {
      console.error("Fetch Settings Error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  const updateSettings = async (updatedSettings: typeof settings) => {
    try {
      setUpdating(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");

      const raw = JSON.stringify(updatedSettings);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
      };

      const response = await fetch(`${BASE_URL}settings/update`, requestOptions);
      const result = await response.json();
      console.log("Update Settings API Response:", result);

      if (!response.ok) {
        Alert.alert("Error", result.message || "Failed to update settings");
        fetchSettings();
      }
    } catch (error) {
      console.error("Update Settings Error:", error);
      Alert.alert("Error", "Network request failed");
      fetchSettings();
    } finally {
      setUpdating(false);
    }
  };

  const handleToggle = (key: string) => {
    const newValue = !settings[key as keyof typeof settings];
    const updatedSettings = { ...settings, [key]: newValue };
    setSettings(updatedSettings);
    updateSettings(updatedSettings);
  };

  const renderItem = ({ item }: { item: typeof notificationOptions[0] }) => (
    <View style={styles.notificationOption}>
      <Text style={styles.optionText}>{item.label}</Text>

      <CommonToggleSwitch
        value={settings[item.key as keyof typeof settings]}
        onValueChange={() => handleToggle(item.key)}
        disabled={updating || initialLoading}
      />
    </View>
  );

  return (
    <AppSafeAreaView edges={['top']} style={styles.container}>
      <StatusBarComponent />
      <ScreenHeader title="Notifications" showNotification={false} />

      {initialLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoadingModal visible={initialLoading} />
        </View>
      ) : (
        <FlatList
          data={notificationOptions}
          keyExtractor={item => item.key}
          renderItem={renderItem}
          contentContainerStyle={{ marginTop: 40, marginHorizontal: 15 }}
          ListFooterComponent={updating ? <Text style={{ color: theme.colors.text, textAlign: 'center', marginTop: 10, opacity: 0.7 }}>Updating...</Text> : null}
        />
      )}
    </AppSafeAreaView>
  );
};

export default NotificationsSetting;

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  switchContainer: {
    width: 45,
    height: 27,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: colors.transparent,
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 15,
  },
});
