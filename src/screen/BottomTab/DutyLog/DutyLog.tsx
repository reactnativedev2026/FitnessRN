import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../utils/Loader';
import CustomHeader from '../../../compoent/CustomHeader';
import LogEntryCard from './Card';
import { GET_API } from '../../../api/APIRequest';
import { ENDPOINT } from '../../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DutyLog = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);
    const [data, setData] = useState([])

    useFocusEffect(
  useCallback(() => {
    getLog();

    return () => {
      // optional cleanup when screen loses focus
    };
  }, [])
);
    const getLog = async () => {
        const token = await AsyncStorage.getItem('token');
        const res = await GET_API(ENDPOINT.USER_LOG, token, 'POST', setLoading)
        console.log(res, 'res')
        if (res?.success) {
            setData(res?.data)
        }
        setData(res?.data)
    }
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <LoadingModal /> : null}

            <StatusBarComponent />
            <CustomHeader
                label="Duty Log"

            />
            <FlatList
                data={data}
                renderItem={({ item }) => <LogEntryCard item={item} />}
                style={{ paddingHorizontal: 15 }}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },

});

export default DutyLog;
