import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import CustomHeader from '../../compoent/CustomHeader';
import { POST_API } from '../../api/APIRequest';
import { useSelector } from 'react-redux';
import LoadingModal from '../../utils/Loader';

const CreateNewInvoice = () => {

  const [customerName, setCustomerName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carVariant, setCarVariant] = useState('');
  const [vinChassisNo, setVinChassisNo] = useState('');
  const [price, setPrice] = useState('');
  const [accessories, setAccessories] = useState('');
  const [tax, setTax] = useState('');
  const [discount, setDiscount] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const auth = useSelector((state: any) => state.auth);
  const validate = () => {
    const e: any = {};

    if (!customerName) e.customerName = 'Required';
    if (!carModel) e.carModel = 'Required';
    if (!carVariant) e.carVariant = 'Required';
    if (!vinChassisNo) e.vinChassisNo = 'Required';
    if (!price) e.price = 'Required';
    if (!tax) e.tax = 'Required';
    if (!discount) e.discount = 'Required';
    // if (!netAmount) e.netAmount = 'Required';

    setErrors(e);
    return Object.keys(e).length === 0;
  };
  
  const toNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};
const calculatedNetAmount =
  toNumber(price) + toNumber(tax) - toNumber(discount);
  const onSubmit = async () => {
    if (!validate()) return;

    const body = {
      customer_name: customerName,        // demo
      car_model: carModel,                // mo1234
      car_variant: carVariant,            // ffrr
      vin_chassis_no: vinChassisNo,        // 535345435
      price: price,                       // 2323
      accessories_addons: accessories,
      tax: tax,                           // 3
      discount: discount,                 // 23
      net_amount: calculatedNetAmount.toString(),
      // accessories_addons:
    };
    console.log(body, 'boduy==================')
    const res = await POST_API(
      // token,      // pass auth token
      auth.token,
      body,
      'user/add_invoice',
      setLoading
    );

    if (res?.success) {
      Alert.alert('Success', 'Invoice created successfully');
    }
  };


  const renderInput = (label, value, setValue, placeholder, keyboardType = 'default', errorKey) => (
    <View style={{ marginBottom: 15 }}>
      <Text allowFontScaling={false} style={styles.label}>{label}</Text>
      <View style={[styles.input, errors[errorKey] && styles.errorInput]}
      >

        <TextInput
          allowFontScaling={false}
          style={{
            color: "black",
            marginLeft: 7
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
        />
      </View>
      {errors[errorKey] && <Text style={styles.errorText}>{errors[errorKey]}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      {loading && <LoadingModal />}
      <StatusBarComponent />

      <CustomHeader label="Create New Invoice" />
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>

        {renderInput('Customer Name', customerName, setCustomerName, 'Enter Customer Name', 'default', 'customerName')}
        {renderInput('Car Model', carModel, setCarModel, 'Enter Car Model', 'default', 'carModel')}
        {renderInput('Car Variant', carVariant, setCarVariant, 'Enter Car Variant', 'default', 'carVariant')}
        {renderInput('VIN / Chassis No', vinChassisNo, setVinChassisNo, 'Enter VIN / Chassis No', 'default', 'vinChassisNo')}
        {renderInput('Price', price, setPrice, 'Enter Price', 'numeric', 'price')}
        {renderInput('Accessories / Add-ons', accessories, setAccessories, 'Enter Accessories', 'default', 'addOnes')}
        {renderInput('Tax', tax, setTax, 'Enter Tax', 'numeric', 'tax')}
        {renderInput('Discount', discount, setDiscount, 'Enter Discount', 'numeric', 'discount')}
        {renderInput('Net Amount', calculatedNetAmount.toString(), calculatedNetAmount.toString(), 'Enter Net Amount', 'numeric', 'netAmount')}


        <CustomButton
          title="Save Invoice"
          onPress={onSubmit}

        />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'black',
    marginBottom: 15,
    fontWeight: 700,
    marginTop: 10
  },
  input: {
    borderColor: '#ddd',         // border color
    borderWidth: 1,              // you need to specify borderWidth
    borderRadius: 8,             // rounded corners
    height: 60,                  // height of the container
    justifyContent: 'center',    // vertically center content
    backgroundColor: 'white',    // background color
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,


  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateNewInvoice;
