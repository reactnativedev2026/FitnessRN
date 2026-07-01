// WorkoutCompleteScreen.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    Share,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { resetToMainTabs } from '../../../routes/navigationService';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const exercises = [
    {
        title: 'Push-ups',
        sub: '3 Sets • 15 reps',
        img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=300&q=80',
    },
    {
        title: 'Dumbbell Fly',
        sub: '3 Sets • 12 reps',
        img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&q=80',
    },
    {
        title: 'Mountain Climbers',
        sub: '4 Sets • 45 sec',
        img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80',
    },
    {
        title: 'Incline Bench',
        sub: '3 Sets • 10 reps',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=80',
    },
];

export default function WorkoutCompleteScreen({ navigation }: any) {
    const bars = [25, 42, 55, 72, 82, 94, 70, 60, 48, 36, 42, 62, 75, 58, 45];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Isolation Cardio" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.badgeOuter}>
                    <View style={styles.badgeInner}>
                        <Ionicons name="star-outline" size={34} color="#BFC7FF" />
                    </View>
                </View>

                <Text style={styles.title}>WORKOUT COMPLETE!</Text>
                <Text style={styles.subtitle}>You crushed the CHEST & CORE session.</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Ionicons name="time-outline" size={18} color="#BFC7FF" />
                        <Text style={styles.statLabel}>TOTAL TIME</Text>
                        <Text style={styles.statValue}>24:42</Text>
                    </View>

                    <View style={styles.statBox}>
                        <MaterialCommunityIcons name="fire" size={18} color="#BFC7FF" />
                        <Text style={styles.statLabel}>CALORIES</Text>
                        <Text style={styles.statValue}>312 <Text style={styles.small}>kcal</Text></Text>
                    </View>
                </View>

                <View style={styles.heartCard}>
                    <View>
                        <Text style={styles.heartTitle}>HEART RATE</Text>
                        <Text style={styles.heartSub}>Avg 142 bpm</Text>
                    </View>

                    <Text style={styles.maxText}>168 <Text style={styles.maxSmall}>MAX</Text></Text>

                    <View style={styles.chartRow}>
                        {bars.map((h, index) => (
                            <View key={index} style={[styles.bar, { height: h }]} />
                        ))}
                    </View>
                </View>

                <View style={styles.summaryHeader}>
                    <Text style={styles.summaryTitle}>EXERCISE SUMMARY</Text>
                    <Text style={styles.completedText}>4 / 4 COMPLETED</Text>
                </View>

                {exercises.map((item, index) => (
                    <View key={index} style={styles.exerciseCard}>
                        <Image source={{ uri: item.img }} style={styles.exerciseImg} />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.exerciseTitle}>{item.title}</Text>
                            <Text style={styles.exerciseSub}>{item.sub}</Text>
                        </View>

                        <View style={styles.checkCircle}>
                            <Ionicons name="checkmark" size={13} color="#fff" />
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.shareBtn}
                    onPress={() => Share.share({
                        message: 'I completed the Chest & Core workout in 24:42 and burned 312 kcal!',
                    })}>
                    <Ionicons name="share-social-outline" size={17} color="#111" />
                    <Text style={styles.shareText}>SHARE PROGRESS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.backBtn}
                    onPress={() => resetToMainTabs()}
                >
                    <Text style={styles.backText}>BACK TO DASHBOARD</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 40,
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
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#24242A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
    },

    avatarText: {
        fontSize: 18,
    },

    hello: {
        color: '#fff',
        fontSize: 9,
    },

    name: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
        marginTop: 2,
    },

    bellBtn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 6,
        right: 7,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#7C5CFF',
    },

    badgeOuter: {
        marginTop: 30,
        alignSelf: 'center',
        width: 132,
        height: 132,
        borderRadius: 66,
        borderWidth: 2,
        borderColor: '#6577C9',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(97,117,210,0.08)',
    },

    badgeInner: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#1D243B',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '900',
        marginTop: 20,
    },

    subtitle: {
        color: '#8D93A3',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 6,
    },

    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 22,
    },

    statBox: {
        flex: 1,
        minHeight: 78,
        borderRadius: 10,
        backgroundColor: '#11151F',
        borderWidth: 1,
        borderColor: '#202638',
        alignItems: 'center',
        justifyContent: 'center',
    },

    statLabel: {
        color: '#8D93A3',
        fontSize: 9,
        fontWeight: '800',
        marginTop: 6,
    },

    statValue: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
        marginTop: 3,
    },

    small: {
        fontSize: 9,
        color: '#8D93A3',
    },

    heartCard: {
        marginTop: 14,
        borderRadius: 10,
        backgroundColor: '#11151F',
        borderWidth: 1,
        borderColor: '#202638',
        padding: 16,
    },

    heartTitle: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },

    heartSub: {
        color: '#8D93A3',
        fontSize: 10,
        marginTop: 4,
    },

    maxText: {
        position: 'absolute',
        right: 16,
        top: 20,
        color: '#BFC7FF',
        fontSize: 20,
        fontWeight: '900',
    },

    maxSmall: {
        fontSize: 8,
        color: '#8D93A3',
    },

    chartRow: {
        marginTop: 20,
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
    },

    bar: {
        flex: 1,
        borderRadius: 3,
        backgroundColor: '#68749E',
    },

    summaryHeader: {
        marginTop: 18,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    summaryTitle: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.7,
    },

    completedText: {
        color: '#8D93A3',
        fontSize: 9,
        fontWeight: '800',
    },

    exerciseCard: {
        minHeight: 62,
        borderRadius: 10,
        backgroundColor: '#11151F',
        borderWidth: 1,
        borderColor: '#202638',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginBottom: 10,
    },

    exerciseImg: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#222',
    },

    exerciseTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
    },

    exerciseSub: {
        color: '#8D93A3',
        fontSize: 10,
        marginTop: 4,
    },

    checkCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: '#6B7FF5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    shareBtn: {
        marginTop: 10,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#BFC7FF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    shareText: {
        color: '#111',
        fontSize: 11,
        fontWeight: '900',
        marginLeft: 8,
    },

    backBtn: {
        marginTop: 12,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#11151F',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },
});
