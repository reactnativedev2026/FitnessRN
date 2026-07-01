// WorkoutTimeScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';
import AppSafeAreaView from '../../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import FitnessHeader from '../../../../component/common/FitnessHeader';
import ScreenHeader from '../../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../../theme';

export default function WorkoutTimeScreen({ navigation }: any) {
    const [morning, setMorning] = useState(true);
    const [evening, setEvening] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Workout Time" />

            <ScrollView showsVerticalScrollIndicator={false} style={{
                paddingHorizontal: 24,

            }}>


                <View style={{ marginTop: 28 }}>
                    <TimeCard
                        label="SESSION 01"
                        title="Morning Workout"
                        time="06:30"
                        period="AM"
                        icon="weather-sunny"
                        value={morning}
                        onChange={setMorning}
                        delay={200}
                    />

                    <TimeCard
                        label="SESSION 02"
                        title="Evening Walk"
                        time="07:00"
                        period="PM"
                        icon="moon-waning-crescent"
                        value={evening}
                        onChange={setEvening}
                        delay={350}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function TimeCard({ label, title, time, period, icon, value, onChange, delay }: any) {
    return (
        <Animated.View entering={FadeInUp.delay(delay).duration(600)} style={styles.card}>
            <View>
                <Text style={styles.cardLabel}>{label}</Text>
                <Text style={styles.cardTitle}>{title}</Text>

                <View style={styles.timeRow}>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.period}>{period}</Text>
                </View>
            </View>

            <View style={styles.rightBox}>
                <MaterialCommunityIcons
                    name={icon}
                    size={34}
                    color={value ? '#F59E0B' : '#37373D'}
                />

                <Switch
                    value={value}
                    onValueChange={onChange}
                    trackColor={{ false: '#26262B', true: '#F59E0B' }}
                    thumbColor="#fff"
                    style={styles.switch}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },

    topHeader: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#24242A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 19,
    },

    hello: {
        color: '#fff',
        fontSize: 9,
        marginLeft: 9,
    },

    name: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
        marginLeft: 9,
        marginTop: 2,
    },

    bell: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 5,
        right: 6,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#7C5CFF',
    },

    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 26,
    },

    stepText: {
        color: '#A1A1AA',
        fontSize: 12,
        marginLeft: 12,
        fontWeight: '600',
    },

    card: {
        minHeight: 126,
        backgroundColor: '#1B1B21',
        borderRadius: 5,
        marginBottom: 26,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },

    cardLabel: {
        color: '#E08A20',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
    },

    cardTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        marginTop: 7,
    },

    timeRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 24,
    },

    time: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '900',
    },

    period: {
        color: '#D1D1D1',
        fontSize: 9,
        fontWeight: '800',
        marginLeft: 6,
        marginBottom: 4,
    },

    rightBox: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    switch: {
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    },
});
