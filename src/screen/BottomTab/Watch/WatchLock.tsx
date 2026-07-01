import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../component/common/ScreenHeader';
import ScreenNameEnum from '../../../routes/screenName.enum';

const days = [
    { day: 'MON', date: '23' },
    { day: 'TUE', date: '24' },
    { day: 'WED', date: '25', active: true },
    { day: 'THU', date: '26' },
    { day: 'FRI', date: '27' },
];

export default function WatchLock({ navigation }: { navigation: any }) {
    const [selectedDate, setSelectedDate] = useState('25');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>


                <View style={styles.performanceHeader}>
                    <Text style={styles.performanceTitle}>DAILY PERFORMANCE</Text>
                    <Text style={styles.dateText}>WED, OCT 25</Text>
                </View>

                <View style={styles.daysRow}>
                    {days.map(item => (
                        <TouchableOpacity
                            key={item.date}
                            activeOpacity={0.8}
                            onPress={() => setSelectedDate(item.date)}
                            style={[styles.dayCard, selectedDate === item.date && styles.activeDayCard]}>
                            <Text style={[styles.dayLabel, selectedDate === item.date && styles.activeDayText]}>
                                {item.day}
                            </Text>
                            <Text style={[styles.dayDate, selectedDate === item.date && styles.activeDayText]}>
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.rewardCard}>
                    <View style={styles.sponsoredBadge}>
                        <Text style={styles.sponsoredText}>SPONSORED</Text>
                    </View>

                    <View style={styles.rewardIconBox}>
                        <MaterialCommunityIcons name="lightning-bolt" size={26} color="#FFA467" />
                    </View>

                    <Text style={styles.rewardTitle}>REWARD: STREAK PROTECTION</Text>

                    <Text style={styles.rewardSub}>
                        Missed a day? Don&apos;t lose your 7-day{'\n'}progress.
                    </Text>

                    <TouchableOpacity

                        onPress={() => {
                            navigation.navigate(ScreenNameEnum.PremiumScreen)
                        }}
                        activeOpacity={0.85} style={styles.unlockBtn}>
                        <Text style={styles.unlockText}>WATCH AD TO UNLOCK</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.offerCard}
                    onPress={() => navigation.navigate(ScreenNameEnum.Marketplace)}>
                    <View style={styles.offerIcon}>
                        <MaterialCommunityIcons name="cart-outline" size={22} color="#FFA467" />
                    </View>

                    <View style={styles.offerTextBox}>
                        <Text style={styles.offerLabel}>LIMITED OFFER</Text>
                        <Text style={styles.offerTitle}>PREMIUM WHEY - 20% OFF NOW</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>TODAY WORKOUT</Text>
                    <Text style={styles.seeAll}>SEE ALL</Text>
                </View>

                <View style={styles.workoutCard}>
                    <View style={styles.workoutIcon}>
                        <Ionicons name="barbell-outline" size={25} color="#FFA467" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.workoutTitle}>Upper Body Strength</Text>
                        <Text style={styles.workoutSub}>35 min • 8 exercises</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.startSmallBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)}>
                        <Text style={styles.startSmallText}>START</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    scroll: {
        paddingHorizontal: 28,
        paddingTop: 18,
        paddingBottom: 120,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#2A2A31',
    },

    hello: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        marginTop: 2,
    },

    bellBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 7,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7B61FF',
    },

    performanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    performanceTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },

    dateText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },

    daysRow: {
        flexDirection: 'row',
        marginTop: 18,
        gap: 7,
    },

    dayCard: {
        width: 45,
        height: 58,
        borderRadius: 8,
        backgroundColor: '#24252D',
        borderWidth: 1,
        borderColor: '#343540',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeDayCard: {
        backgroundColor: '#FFA28F',
        borderColor: '#FFA28F',
    },

    dayLabel: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '700',
    },

    dayDate: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
        marginTop: 4,
    },

    activeDayText: {
        color: '#141414',
    },

    rewardCard: {
        marginTop: 78,
        borderRadius: 7,
        backgroundColor: '#1C1F26',
        borderWidth: 1,
        borderColor: '#333743',
        minHeight: 220,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        position: 'relative',
    },

    sponsoredBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        borderWidth: 1,
        borderColor: '#747985',
        paddingHorizontal: 4,
        paddingVertical: 2,
    },

    sponsoredText: {
        color: '#A7AAB3',
        fontSize: 6,
        fontWeight: '900',
    },

    rewardIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#5A351C',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    rewardTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
        textAlign: 'center',
    },

    rewardSub: {
        color: '#C8CAD3',
        fontSize: 12,
        lineHeight: 20,
        textAlign: 'center',
        marginTop: 9,
    },

    unlockBtn: {
        marginTop: 25,
        height: 42,
        width: '92%',
        borderWidth: 2,
        borderColor: '#FFA467',
        alignItems: 'center',
        justifyContent: 'center',
    },

    unlockText: {
        color: '#FFA467',
        fontSize: 14,
        fontWeight: '900',
    },

    offerCard: {
        marginTop: 50,
        height: 50,
        backgroundColor: '#14161D',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },

    offerIcon: {
        width: 34,
        height: 34,
        backgroundColor: '#2C2526',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    offerTextBox: {
        flex: 1,
    },

    offerLabel: {
        color: '#FFA467',
        fontSize: 7,
        fontWeight: '900',
    },

    offerTitle: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '800',
        marginTop: 2,
    },

    sectionHeader: {
        marginTop: 36,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '900',
    },

    seeAll: {
        color: '#FFA467',
        fontSize: 11,
        fontWeight: '900',
    },

    workoutCard: {
        height: 78,
        borderRadius: 14,
        backgroundColor: '#15171E',
        borderWidth: 1,
        borderColor: '#282B35',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    workoutIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#2C2526',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    workoutTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
    },

    workoutSub: {
        color: '#A1A1AA',
        fontSize: 11,
        marginTop: 4,
    },

    startSmallBtn: {
        height: 32,
        paddingHorizontal: 13,
        borderRadius: 8,
        backgroundColor: '#FFA467',
        justifyContent: 'center',
    },

    startSmallText: {
        color: '#111',
        fontSize: 10,
        fontWeight: '900',
    },

    bottomSpace: {
        height: 40,
    },
});
