import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../component/common/StatusBarCompoent";
import LoadingModal from "../../../component/LoadingModal";
import CustomHeader from "../../../component/common/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../component/common/CustomButton";
import { Linking } from "react-native";
import { POST_API, GET_API } from "../../../api/APIRequest";
import { ENDPOINT } from "../../../api/endpoints";
import { color } from "../../../theme/colors";

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await GET_API(ENDPOINT.CONTACT_US, null, "GET", setLoading);
      if (response?.success) {
        console.log("Contact Us Response:", response);
        setContactInfo(response.data?.data || response.data);
      }
    };
    fetchContact();
  }, []);

  const isLogin = useSelector((state: any) => state?.auth);
  const [isLoading, setLoading] = useState(false);
  const [SupportHelp, setSupportHelp] = useState("");


  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* Render Contact Us content */}
      <CustomHeader


        // imageSource={imageIndex.menu}
        label="Help & Support"
      />

      {contactInfo && (
        <View style={styles.contactContainer}>
          <Image
            source={imageIndex.helpPrva}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>{contactInfo.title}</Text>
          <Text style={styles.content}>{contactInfo.content}</Text>
          <Text style={styles.link} onPress={() => Linking.openURL(`mailto:${contactInfo.support_email}`)}>{contactInfo.support_email} </Text>
          <Text style={styles.link} onPress={() => Linking.openURL(`tel:${contactInfo.support_phone}`)}>{contactInfo.support_phone} </Text>
        </View>
      )}

      <StatusBarComponent />
      {isLoading ? <LoadingModal /> : null}
      <View>

        <View style={{ marginHorizontal: 15 }}>


          {/* Text input for user’s query */}
          {/* <View
            style={{
              borderWidth: 1, // thickness of the border
              borderColor: "rgba(251, 91, 43, 1)", // color of the border
              borderRadius: 15, // rounded corners
              height: 140,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "rgba(251, 91, 43, 1)",
                marginBottom: 8,
                marginLeft: 10,
                marginTop: 5,
                fontWeight: "800",
              }}
            >
              How can we help?
            </Text>
            <TextInput
              value={SupportHelp}
              onChangeText={setSupportHelp}
              style={{
                fontSize: 12,
                color: "black",
                marginLeft: 10,
                fontWeight: "500",
                bottom: 10,
                textAlignVertical: "top", // Ensures text starts at the top in Android
              }}
              placeholder="Type Here..."
              placeholderTextColor="rgba(84, 84, 84, 1)"
              multiline
            />
          </View> */}

          {/* <View
            style={{
              flex: 1,
              position: "relative",
              top: 100,
            }}
          >
            <CustomButton title="Submit" onPress={() => handleSubmit()} />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  illustrationContainer: {
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: "100%",
    height: 270,
  },
  input: {
    marginTop: 20,
    marginHorizontal: 16,
    padding: 55,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    textAlignVertical: "top", // Ensures multiline text starts at top
    fontSize: 16,
  },
  contactContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    marginTop: 5,
    color: '#1e90ff',
    paddingRight: 3
  },
});
