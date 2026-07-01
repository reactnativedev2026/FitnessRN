import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';

const SIZE = 250;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function FastingScreen({ navigation }: any) {
    const progress = 0.72;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />
            <ScreenHeader title="Active Fast" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>



                <View style={styles.timerWrapper}>
                    <View style={styles.orangeGlow} />

                    <Svg width={SIZE} height={SIZE}>
                        <Circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            stroke="#272A33"
                            strokeWidth={STROKE}
                            fill="transparent"
                        />
                        <Circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            stroke="#F1EEFF"
                            strokeWidth={STROKE}
                            fill="transparent"
                            strokeDasharray={CIRCUMFERENCE}
                            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                            strokeLinecap="round"
                            rotation="-90"
                            origin={`${SIZE / 2}, ${SIZE / 2}`}
                        />
                    </Svg>

                    <View style={styles.timerCenter}>
                        <Text style={styles.timerLabel}>TIME REMAINING</Text>
                        <Text style={styles.timerText}>14:22:04</Text>

                        <View style={styles.statusPill}>
                            <Ionicons name="flame" size={11} color="#FF9500" />
                            <Text style={styles.statusText}>FAT BURNING</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardsRow}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={[styles.infoCard, styles.mealCard]}
                        onPress={() => navigation.navigate(ScreenNameEnum.MealRecommendation)}>
                        <View style={styles.cardIcon}>
                            <MaterialCommunityIcons
                                name="silverware-fork-knife"
                                size={20}
                                color="#FFB36B"
                            />
                        </View>

                        <View style={styles.cardTop}>
                            <Text style={styles.cardLabel}>NEXT MEAL</Text>
                            <Ionicons name="arrow-forward" size={15} color="#8D919C" />
                        </View>

                        <Text style={styles.cardValue}>
                            08:30 <Text style={styles.cardUnit}>AM</Text>
                        </Text>
                        <Text style={styles.cardHint}>View meal plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={[styles.infoCard, styles.streakCard]}
                        onPress={() => navigation.navigate(ScreenNameEnum.RanksScreen)}>
                        <View style={[styles.cardIcon, styles.streakIcon]}>
                            <Ionicons name="flame" size={21} color="#FF9500" />
                        </View>

                        <View style={styles.cardTop}>
                            <Text style={styles.cardLabel}>STREAK</Text>
                            <Ionicons name="arrow-forward" size={15} color="#8D919C" />
                        </View>

                        <Text style={styles.cardValue}>
                            12 <Text style={styles.cardUnit}>DAYS</Text>
                        </Text>
                        <Text style={styles.cardHint}>View ranking</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.endBtn}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="stopwatch-outline" size={18} color="#FF9500" />
                    <Text style={styles.endText}>END FAST</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const ORANGE = '#FF9500';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scroll: {
        paddingHorizontal: 24,
        paddingTop: 22,
        paddingBottom: 80,
        minHeight: '100%',
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

    backButton: {
        alignItems: 'center',
        height: 36,
        justifyContent: 'center',
        marginRight: 8,
        width: 30,
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: 22,
        backgroundColor: '#24242B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    avatarText: {
        fontSize: 21,
    },

    hello: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },

    name: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '900',
        marginTop: 3,
    },

    bellBtn: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 7,
        right: 7,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7B61FF',
    },

    timerWrapper: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    orangeGlow: {
        position: 'absolute',
        width: 210,
        height: 210,
        borderRadius: 105,
        backgroundColor: 'rgba(255,149,0,0.08)',
    },

    timerCenter: {
        position: 'absolute',
        alignItems: 'center',
    },

    timerLabel: {
        color: '#B8B8C2',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 4,
    },

    timerText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '900',
        marginTop: 8,
    },

    statusPill: {
        marginTop: 10,
        height: 25,
        borderRadius: 13,
        backgroundColor: '#1C1E25',
        borderWidth: 1,
        borderColor: '#3A3C46',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusText: {
        color: '#FF9500',
        fontSize: 10,
        fontWeight: '900',
        marginLeft: 4,
    },

    cardsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 36,
    },

    infoCard: {
        flex: 1,
        minHeight: 162,
        borderRadius: 20,
        backgroundColor: '#171920',
        borderWidth: 1,
        borderColor: '#2D303A',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 14,
        elevation: 6,
    },

    mealCard: {
        backgroundColor: '#17191F',
    },

    streakCard: {
        backgroundColor: '#1A1714',
        borderColor: 'rgba(255,149,0,0.28)',
    },

    cardIcon: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,179,107,0.12)',
        borderRadius: 14,
        height: 42,
        justifyContent: 'center',
        marginBottom: 14,
        width: 42,
    },

    streakIcon: {
        backgroundColor: 'rgba(255,149,0,0.14)',
    },

    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardLabel: {
        color: '#B8B8C2',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1.4,
    },

    cardValue: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '900',
        marginTop: 8,
    },

    cardUnit: {
        color: '#C7C7D1',
        fontSize: 11,
        fontWeight: '700',
    },

    cardHint: {
        color: '#858994',
        fontSize: 10,
        fontWeight: '600',
        marginTop: 4,
    },

    endBtn: {
        alignSelf: 'center',
        marginTop: 28,
        width: 210,
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: ORANGE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    endText: {
        color: ORANGE,
        fontSize: 14,
        fontWeight: '900',
        marginLeft: 7,
    },
});
